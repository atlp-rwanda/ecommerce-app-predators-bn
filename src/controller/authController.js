import hasher from '../utils/hashPassword.js';
import db from '../database/models/index.js';
import bcrypt from "bcrypt";
import Jwt from "../utils/jwt.js";
import {
  getUserByGoogleId,
  registerGoogle,
} from "../services/user.services.js";
import generateToken from "../utils/userToken.js";
import sendEmail from "../utils/sendEmail";
import jsend from "jsend";

export const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the given email exists
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json(jsend.fail({ message: "Invalid Credentials😥" }));
    } else if (user.status === "disabled") {
      return res
        .status(401)
        .json(jsend.fail({ message: "User is disabled😥" }));
    }

    // Compare the given password with the hashed password in the database
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res
        .status(401)
        .json(jsend.fail({ message: "Invalid Credentials😥" }));
    }

    // If the email and password are valid, generate a JWT token
    const token = generateToken(user);

    // Set the token in a cookie with HttpOnly and Secure flags
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json(jsend.success({ message: "Login Successful", token }));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(jsend.error({ message: "Opps 😰 server error" }));
  }
};
import { getUserByEmail, registerGoogle } from "../services/user.services.js";
import db from "../database/models/index.js";
import sendEmail from "../utils/sendEmail.js"; // eslint-disable-line import/no-unresolved, import/extensions,

// Function to create a new user with a Google account
export const googleAuthHandler = async (req, res) => {
  const { value } = req.user.emails[0];
  const { familyName } = req.user.name;
  const { id } = req.user;
  // Create a new user object with the Google account data
  const newUser = {
    name: familyName,
    email: value,
    password: "password",
    roleId: 0,
    googleId:id,
  };

  // Check if user already exists
  const user = await getUserByEmail(newUser.googleId);
  if (user) {
    // User already exists, generate JWT and redirect
    const { id, email, name, password, roleId } = user;
    roleId: 2,
    googleId: id,
    status: "active",
  };

  // Check if user already exists
  const user = await getUserByGoogleId(newUser.googleId);
  if (user) {
    // User already exists, generate JWT and redirect
    const { id, email, name, password, roleId ,googleId} = user;
    const userToken = Jwt.generateToken(
      {
        id: id,
        email: email,
        name: name,
        password: password,
        roleId: roleId,
        status: "active",
        googleId: googleId,
      },
      "1h"
    );
    res.cookie("jwt", userToken);
    return res.redirect(`/api/callback?key=${userToken}`);
  } else {
    // User does not exist, create new user and generate JWT
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    const { id, email, name, password, roleId } = await registerGoogle(newUser);

    const { id, email, name, password, roleId, googleId } =
      await registerGoogle(newUser);
    const userToken = Jwt.generateToken(
      {
        id: id,
        email: email,
        name: name,
        password: password,
        roleId: roleId,
        status: "active",
        googleId: googleId,
      },
      "1h"
    );
    res.cookie("jwt", userToken);
    return res.redirect(`/api/callback?key=${userToken}`);
  }
};
// get the user from the database

export const GetUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    return res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get the user from the database by id

export const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//delete the user from the database by id

export const DeleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.User.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    // Send success response
    res.status(200).json({ message: "Logout successful" });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).json({ message: "Internal server error" });
  }
};
export const disableUser = async (req, res) => {
  const {id} = req.params;
  const { status, reason,} = req.body;

  try {
    const user = await db.User.findOne({ where: { id:id } });
    if (!user) {
      return res.status(404).json({
        message: `user with this id:${id} does not exit `,
      });
    } else {
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
        
        
The E-commerce ATLP-Predators project team
`;

        sendEmail.sendEmail(to, "account status", text);
        
        return res
          .status(200)
          .json({ message: `User account ${status} successfully  ` });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export default {
  googleAuthHandler,
  GetUsers,
  GetUserById,
  DeleteUserById,
  logout,
  disableUser
};

