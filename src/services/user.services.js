import db from "../database/models/index.js";

const registerGoogle = async (data) => {
<<<<<<< HEAD
    try {
      const user = await db.User.create(data);
      return user;
    } catch (error) {
      throw new Error('Could not create user');
    }
  };
export default registerGoogle;
=======
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
const getUserByGoogleId = async (googleId) => {
  try {
    const user = await db.User.findOne({
      where: {
        googleId: googleId,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Could not find user");
  }
};


export { registerGoogle, getUserByEmail, getUserByGoogleId};
>>>>>>> f03ff16665eecd01c3cf81adcf4f59892dc7b297
