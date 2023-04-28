import db from "../database/models/index.js";

export const registerGoogle = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (error) {
    console.log(error.message);
    throw new Error("Could not create user");
    
  }
};
//getUserByEmail
export const getUserByEmail = async (email) => {
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
export const getUserByGoogleId = async (googleId) => {
  try {
    const user = await db.User.findOne({
      where: {
        googleId: googleId,
      },
    });
    return user;
  } catch (error) {
 // eslint-disable-line no-console 		throw new Error('Could not find user';
    throw new Error('Could not find user');
  }
};

export const updateUserPassword = async (payload,userPass) => {
  try{ 
        const email = payload.email; 
        const pass = userPass.password; 
        const password = await hashPassword(pass);  
        const findData = await db.User.findOne({
              where: { email },
            });
        
        if (userPass.password === userPass.confirm_password) {
            findData.password = password;

            await findData.save().then((result) =>{ 
              return result;
              
            });
        }else{
          return false
        }
      }catch(error){
        return false
      }
};

export  default{ registerGoogle, getUserByEmail, getUserByGoogleId,updateUserPassword};
