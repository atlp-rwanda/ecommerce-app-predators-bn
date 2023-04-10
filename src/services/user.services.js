import db from "../database/models/index.js";

const registerGoogle = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (error) {
    console.log(error.message);
    throw new Error("Could not create user");
    
  }
};
//getUserByEmail
const getUserByEmail = async (email) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Could not find user");
  }
};

export { registerGoogle, getUserByEmail };
