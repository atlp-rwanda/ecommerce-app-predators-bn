// imports
import models from '../database/models/user.js';

async function register(req, res) {
  try {
    models.User.create({
      name: req.nm,
      email: req.eml,
      password: req.pw,
      roleId: req.role,
      status: req.state,
      gender: req.gd,
      preferred_language: req.language,
      preferred_currency: req.currency,
    });
    res.status(200).json({message: 'successfully created'});
  } catch (error) {
    res.status(500).json({ message: 'Inernal server error' });
  }
}

// export the post controller
export default register;
