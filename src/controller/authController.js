/* eslint-disable consistent-return */
// imports
import hasher from '../utils/hashPassword.js';
import db from '../database/models/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  if (!name || !email || !password) {
    return res.status(400).send('Invalid input');
  }

  try {
    // hash password
    const hashedPassword = await hasher(password);

    // Create user in the database (using Sequelize ORM)
    const user = await db.User.create({
      name,
      email,
      roleId: 2,
      password: hashedPassword,
    });
    res.status(200).json({ message: user }); // /!\use jsend

    // Send confirmation email
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// export the post controller
export default register;
