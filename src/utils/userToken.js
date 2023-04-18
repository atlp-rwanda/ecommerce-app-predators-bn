import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (user) => {
  const token = jwt.sign(
    {
<<<<<<< HEAD
      sub: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
=======
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      status: user.status,
      
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
>>>>>>> f03ff16665eecd01c3cf81adcf4f59892dc7b297
  );
  return token;
};

export default generateToken;