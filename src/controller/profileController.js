/* eslint-disable consistent-return */
// imports
import db from '../database/models/index.js';
import jwt from 'jsonwebtoken';

// Updating user Profile

const getUserProfile = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: []
    });

    return res.status(200).json({ message: req.t('user_retrieved_exception'), data: users });
  } catch (err) {
    console.log("error " + err);
    return res.status(500).json(err);
  }
};


// Updating user Profile
const updateUserProfile = async (req, res) => {
 // check if the request has an authorization header
 const authHeader = req.headers.authorization;

 if (!authHeader) {
   return res.status(401).json({
     message: "No Token Provided",
   });
 } else {
   // Getting token
   const token = authHeader.split(" ")[1];
 
   try {
     // verify if token is valid
     const verifiedUser = jwt.verify(token, 'secret_key', {
      expiresIn: "1d",
    });
    
    const userId = verifiedUser.profileId;
    
   
     // check if the user exists in the database
     const user = await db.User.findByPk(verifiedUser.profileId);
   
     if (!user) {
       return res.status(404).json({
         message: "User not found",
       });
     }

     // update the user's profile with the data from the request body
     user.name = req.body.name || user.name;
     user.email = req.body.email || user.email;
     user.roleId= req.body.roleId || user.roleId;
     user.status= req.body.status || user.status;
     user.googleId= req.body.googleId || user.googleId;
     user.preferred_language= req.body.preferred_language || user.preferred_language;
     user.preferred_currency= req.body.preferred_currency || user.preferred_currency;
     user.password= req.body.password || user.password;

     const updatedUser = await user.save();
     console.log(updatedUser);
     res.json({
       message: "User profile updated successfully",
       user: updatedUser,
     });
   } catch (error) {
     res.status(500).json({
       message: error.message,
     });
   }
 }
};


export default { getUserProfile, updateUserProfile };
