import Jwt from '../utils/jwt.js';
import registerGoogle from '../services/user.services.js';

export const googleAuthHandler = async (req, res) => {
  const { value } = req.user.emails[0];
  const { familyName } = req.user.name;
  const newUser = {
    name: familyName,
    email: value,
    // avatar: req.user.photos[0].value,
    // verified: true,
    password: '12345',
  };
  const { id, email } = await registerGoogle(newUser);
  const userToken = Jwt.generateToken({
    id,
    email,
  }, '1h');
  return res.redirect(`/api/callback?key=${userToken}`);
};

export default googleAuthHandler;
