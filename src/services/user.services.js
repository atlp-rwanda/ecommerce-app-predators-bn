import db from "../database/models/index.js";

const registerGoogle = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (error) {
    throw new Error(`${error.message}`);
    
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
    throw new Error(`${error.message}`);
  }
};
const getUserByGoogleId = async (googleId) => {
  try {
    const user = await db.User.findOne({
      where: {
        googleId: googleId,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export { registerGoogle, getUserByEmail, getUserByGoogleId};