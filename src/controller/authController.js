/* eslint-disable consistent-return */
// imports
import db from '../database/models/index.js';

const register = async (req, res) => {
  const {
    name, email, password, gender,
  } = req.body;
  if (!name || !email || !password || !gender) return res.status(400).json({ message: 'Missing Data!' });

  try {
    const result = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// export the post controller
export default register;
