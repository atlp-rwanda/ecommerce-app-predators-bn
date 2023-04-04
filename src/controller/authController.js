import bcrypt from 'bcrypt';
import Jwt from '../utils/jwt.js';
import registerGoogle from '../services/user.services.js';

export const googleAuthHandler = async (req, res) => {
  const { value } = req.user.emails[0];
  const { familyName } = req.user.name;
  const newUser = {
    name: familyName,
    email: value,
    password: '12345'
  };
  
  // Hash the password before registering the user
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
  newUser.password = hashedPassword;

  const { id, email ,name,password } = await registerGoogle(newUser);
  const userToken = Jwt.generateToken({
    id: id,
    email: email,
    name: name,
    password: password
  }, '1h');
  return res.redirect(`/api/callback?key=${userToken}`);
}


export default googleAuthHandler;
