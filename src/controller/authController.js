import bcrypt from "bcrypt";
import Jwt from "../utils/jwt.js";
import { getUserByEmail, registerGoogle } from "../services/user.services.js";
import db from "../database/models/index.js";

export const googleAuthHandler = async (req, res) => {
  const { value } = req.user.emails[0];
  const { familyName } = req.user.name;
  const { id } = req.user;
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
    const userToken = Jwt.generateToken(
      {
        id: id,
        email: email,
        name: name,
        password: password,
        roleId: roleId,
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
    const userToken = Jwt.generateToken(
      {
        id: id,
        email: email,
        name: name,
        password: password,
        roleId: roleId,
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

export default {
  googleAuthHandler,
  GetUsers,
  GetUserById,
  DeleteUserById,
  logout,
};
