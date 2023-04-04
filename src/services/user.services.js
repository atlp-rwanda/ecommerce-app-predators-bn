import db from "../database/models/index.js";

const registerGoogle = async (data) => {
    try {
      const user = await db.User.create(data);
      return user;
    } catch (error) {
      throw new Error('Could not create user');
    }
  };
export default registerGoogle;