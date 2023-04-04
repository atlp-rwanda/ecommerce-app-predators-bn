// imports
import models from '../database/models';

// export the post controller
export default {
  async register(req, res) {
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
    } catch (error) {
      res.status(500).json({ message: 'Inernal server error' });
    }
  },
};
