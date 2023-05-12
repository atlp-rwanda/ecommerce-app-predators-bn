import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const adminToken = (email) => {
  // Create a payload with the user's email and role ID
  const payload = { email, roleId: 0 };

  // Sign the payload with the JWT_SECRET key and set the expiration time to 1 hour
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

export default adminToken;