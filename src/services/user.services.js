import db from "../database/models/index.js";

const registerGoogle = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (error) { 
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
    if (!user) {
       throw new Error("Could not find user");
    }
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


const updateUserPassword = async (payload,userPass) => {
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

export { registerGoogle, getUserByEmail, getUserByGoogleId,updateUserPassword};
