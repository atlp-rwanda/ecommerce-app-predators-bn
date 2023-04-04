/* eslint-disable consistent-return */
// imports
import db from '../database/models/index.js';

const register = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  // Validate user input
  if (!name || !email || !roleId || !password) {
    return res.status(400).send('Invalid input');
  }

  try {
    // Redirect to appropriate route based on user roleId
    if (roleId === 0) {
      // buyer
    } else if (roleId === 1) {
      // vendor
    
      
    } else {
      return res.status(400).send('Invalid roleId');
    };

    // Create user in the database (using Sequelize ORM)
    const user = await db.User.create({
      name,
      email,
      roleId,
      password: hashedPassword,
    });
    res.status(200).json({ message: user});
    console.log(user);

    // Send confirmation email
  
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// export the post controller
export default register;
