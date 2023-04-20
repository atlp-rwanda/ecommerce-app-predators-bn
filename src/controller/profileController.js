/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable radix */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../database/models/index.js';

// Getting all user Profiles

const getUserProfile = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: [],
    });
    if (!users) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: { users },
        message: req.t('user_not_found_exception'),
      });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { users },
      message: req.t('user_retrieved_exception'),
    });
  } catch (err) {
    return res.status(500).json({
      status: 'server error',
      code: 500,
      data: { message: req.t('user_not_found_exception') },
    });
  }
};

// Getting all user Profile by Id

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: { user },
        message: req.t('user_not_found_exception'),
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { user },
      message: req.t('user_retrieved_exception'),
    });
  } catch (err) {
    return res.status(500).json({
      status: 'server error',
      code: 500,
      data:
       { message: req.t('user_not_found_exception') },
    });
  }
};
// Updating user Profile
const updateUserProfile = async (req, res) => {
  const userToken = req.headers.authorization.split(' ')[1];// Get user token from request headers
  const { id } = req.params;
  const {
    name,
    email,
    roleId,
    status,
    googleId,
    gender,
    preferred_language,
    preferred_currency,
    password,
  } = req.body;

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET); // Verify user token
    if (decoded.id !== parseInt(id)) { // Check if authenticated user ID matches requested user ID
      return res.status(403).json({
        status: 'fail',
        code: 403,
        message: req.t('not_authorized_exception'),
      });
    }
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: { user },
        message: req.t('user_not_found_exception'),
      });
    }

    // Hash the password if it's included in the request body
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.roleId = roleId || user.roleId;
    user.status = status || user.status;
    user.googleId = googleId || user.googleId;
    user.gender = gender || user.gender;
    user.preferred_language = preferred_language || user.preferred_language;
    user.preferred_currency = preferred_currency || user.preferred_currency;
    // Save the updated user object to the database
    await user.save();
    // Return the updated user object as a response
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { user },
      message: req.t('user_updated_exception'),
    });
  } catch (err) {
    return res.status(500).json({ status: 'server error', code: 500 });
  }
};
export default { getUserProfile, updateUserProfile, getUserById };
