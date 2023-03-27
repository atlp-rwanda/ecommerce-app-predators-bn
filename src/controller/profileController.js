import db from '../database/models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//Getting all user Profiles

const getUserProfile = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: []
    });
    if (!users) {
      return res.status(404).json({
        message: req.t('user_not_found_exception')
      });
    }
    return res.status(200).json({ message: req.t('user_retrieved_exception'), data: users });
  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err);
  }
};

//Getting all user Profile by Id

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await db.User.findOne({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        message: req.t('user_not_found_exception')
      });
    }

    return res.status(200).json({
      message: req.t('single_user_found_exception'),
      data: user
    });
  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err);
  }

};
// Updating user Profile
const updateUserProfile = async (req, res) => {
  const userToken = req.headers.authorization.split(' ')[1];// Get user token from request headers
  const { id } = req.params;

  const { name,
    email,
    roleId,
    status,
    preferred_language,
    gender,
    preferred_currency,
    password
  } = req.body;

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET); // Verify user token
    if (decoded.id !== parseInt(id)) {// Check if authenticated user ID matches requested user ID
      return res.status(403).json({ message: req.t('not_authorized_exception') });
    }
    const user = await db.User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: req.t('user_not_found_exception') });
    }

    // Hash the password if it's included in the request body
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (roleId == null) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.roleId = roleId || user.roleId;
      user.status = status || user.status;
      user.gender = gender || user.gender;
      user.preferred_language = preferred_language || user.preferred_language;
      user.preferred_currency = preferred_currency || user.preferred_currency;
      // Save the updated user object to the database
      await user.save();
      // Return the updated user object as a response
      return res.status(200).json({ message: req.t('user_updated_exception'), data: user });
    } else if (roleId == 1) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.roleId = roleId || user.roleId;
      user.gender = gender || user.gender;
      user.preferred_language = preferred_language || user.preferred_language;
      user.preferred_currency = preferred_currency || user.preferred_currency;
      // Save the updated user object to the database
      await user.save();
      // Return the updated user object as a response
      return res.status(200).json({ message: req.t('user_updated_exception'), data: user });
    } else {
      user.name = name || user.name;
      user.email = email || user.email;
      user.gender = gender || user.gender;
      user.preferred_language = preferred_language || user.preferred_language;
      user.preferred_currency = preferred_currency || user.preferred_currency;
      // Save the updated user object to the database
      await user.save();
      // Return the updated user object as a response
      return res.status(200).json({ message: req.t('user_updated_exception'), data: user });
    }

  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err);
  }
};



export default { getUserProfile, updateUserProfile, getUserById };
