import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (user) => {
  const token = jwt.sign(
    {
      sub: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

export default generateToken;