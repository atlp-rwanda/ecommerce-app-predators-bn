import jsend from 'jsend';
import bcrypt from 'bcrypt';
import hasher from '../utils/hashPassword.js';
import db from '../database/models/index.js';
import Jwt from '../utils/jwt.js';
import {
  getUserByGoogleId,
  registerGoogle, getUserByEmail, updateUserPassword,
} from '../services/user.services.js';
import generateToken from '../utils/userToken.js';
import sendEmail from '../utils/sendEmail.js';

export const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the given email exists
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json(jsend.fail({ message: 'Invalid Credentials😥' }));
    } if (user.status === 'disabled') {
      return res
        .status(401)
        .json(jsend.fail({ message: 'User is disabled😥' }));
    }

    // Compare the given password with the hashed password in the database
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res
        .status(401)
        .json(jsend.fail({ message: 'Invalid Credentials😥' }));
    }

    // If the email and password are valid, generate a JWT token
    const token = generateToken(user);

    // Set the token in a cookie with HttpOnly and Secure flags
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json(jsend.success({ message: 'Login Successful', token }));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(jsend.error({ message: 'Opps 😰 server error' }));
  }
};

// Function to create a new user with a Google account
export const googleAuthHandler = async (req, res) => {
  const { value } = req.user.emails[0];
  const { familyName } = req.user.name;
  const { id } = req.user;

  // Create a new user object with the Google account data
  const newUser = {
    name: familyName,
    email: value,
    password: 'password',
    roleId: 2,
    googleId: id,
    status: 'active',
  };

  // Check if user already exists
  const user = await getUserByGoogleId(newUser.googleId);
  if (user) {
    // User already exists, generate JWT and redirect
    const {
      id, email, name, password, roleId, googleId,
    } = user;
    const userToken = Jwt.generateToken(
      {
        id,
        email,
        name,
        password,
        roleId,
        status: 'active',
        googleId,
      },
      '1h',
    );
    res.cookie('jwt', userToken);
    return res.redirect(`/api/callback?key=${userToken}`);
  } else {
    // User does not exist, create new user and generate JWT
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    const {
      id, email, name, password, roleId, googleId,
    } = await registerGoogle(newUser);
    const userToken = Jwt.generateToken(
      {
        id,
        email,
        name,
        password,
        roleId,
        status: 'active',
        googleId,
      },
      '1h',
    );
    res.cookie('jwt', userToken);
    return res.redirect(`/api/callback?key=${userToken}`);
  }
};
// get the user from the database

export const GetUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// get the user from the database by id

export const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({
      where: { id },
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send('User with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// delete the user from the database by id

export const DeleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.User.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    // Send success response
    res.status(200).json({ message: 'Logout successful' });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const disableUser = async (req, res) => {
  const { status, reason, email } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: `user with email : ${email} does not exit `,
      });
    }
    user.status = status;

    await user.save();

    if (user) {
      const to = user.email;
      const text = `
        Subject: Notification of account deactivation

        Dear User,
        
        We regret to inform you that your account on our website has been ${status} due to a ${reason}. Our team has conducted a thorough investigation and found evidence of unauthorized activity on your account.
        
        As a result, we have taken the necessary steps to protect the security and integrity of our platform by deactivating your account. We take the security of our website and our users very seriously, and we will not tolerate any illegal activities or harmful behavior.
        
        Please note that you will no longer be able to access your account or any associated services. If you have any questions or concerns about this decision, please do not hesitate to contact us at predators@gmail.com.
        
        Thank you for your understanding and cooperation.
        
        Best regards,
        
        The E-commerce ATLP-Predators project team`;

      sendEmail.sendEmail(to, 'account status', text);

      return res
        .status(200)
        .json({ message: `User account ${status} successfully  ` });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  if (!name || !email || !password) {
    return res.status(400).send('Invalid input');
  }

  try {
    // hash password
    const hashedPassword = await hasher(password);

    // Create user in the database (using Sequelize ORM)
    const user = await db.User.create({
      name,
      email,
      roleId: 2,
      password: hashedPassword,
    });
    res.status(200).json(jsend.success({ message: 'User created', usr: user })); // /!\use jsend

    // Send confirmation email
  } catch (err) {
    console.error(err);
    return res.status(500).json(jsend.fail({ message: 'failed to register user' }));
  }
};

// requesting reset password 
export const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).jsend.error({
        code: 400,
        message: 'User with email does not exist!',
        data: false,
      });
    }

    const userEmail = { email, id: user.id };

    const token = Jwt.generateToken(userEmail, '15m');

    sendEmail.sendEmail({
      email,
      subject: 'Predators E-commerce Reset Password',
      text: `
                    <p>Reset your password.</p>
                    <p>Please click the link below to reset your password.</p> 
                    
                    <a href="${process.env.APP_URL}/api/user/reset-password/${token}">Reset password</a>
                    
                    `,
    });
    res.cookie('reset-token', token, { httponly: true, expiresIn: '15m' });

    res.status(200).send(jsend.success({
      code: 200,
      message: 'Password reset link was sent to your email',
      data: { token },
    }));
  } catch (error) {
    return res.status(500).send(jsend.fail({
      code: 500,
      message: error.message,
      data: false,
    }));
  }
};

// validate reset link
export const resetPasswordLink = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = Jwt.verifyToken(token);
    const userEmail = { email: payload.email };

    const user = await getUserByEmail(userEmail.email);

    if (!payload) {
      return res.status(401).send(jsend.fail({
        code: 401,
        message: 'Token is invalid',
        data: false,
      }));
    }
    if (!user) {
      return res.status(401).send(jsend.fail({
        code: 401,
        message: 'User does not exist',
        data: false,
      }));
    }
    return res.status(200).send(jsend.fail({
      code: 200,
      message: 'User exists',
      data: user,
    }));
  } catch (error) {
    return res.status(401).send(jsend.fail({
      code: 401,
      message: error.message,
      data: false,
    }));
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = Jwt.verifyToken(token);
    const userPass = req.body;

    await updateUserPassword(payload, userPass).then((result) => {
      if (result == 0) {
        return res.status(400).send(jsend.fail({
          code: 400,
          message: 'Password reset failed',
          data: false,
        }));
      }
      res.cookie('reset-token', '', { maxAge: 1 });
      return res.status(200).send(jsend.success({
        code: 200,
        message: 'You have reset successful your password',
        data: result,
      }));
    });
  } catch (error) {
    return res.status(401).send(jsend.fail({
      code: 401,
      message: error.message,
      data: false,
    }));
  }
};

export default {
  googleAuthHandler,
  GetUsers,
  GetUserById,
  DeleteUserById,
  logout,
  disableUser,
  register,
  UserLogin,
};
/* eslint-disable consistent-return */
// imports
