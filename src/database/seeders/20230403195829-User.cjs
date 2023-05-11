const bcrypt = require('bcrypt');
require('dotenv').config();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
<<<<<<< HEAD
          name: 'Predators Admin',
          email: process.env.EMAIL,
          password: hashedPassword,
=======
          name: 'Admin',
          email: 'andelapreda@gmail.com',
          password:'PredatorAdmin@1',
>>>>>>> 14367e8 (ft(buyer-give-review)-9)
          roleId: 0,
          status: 'active',
          googleId: 1,
          gender: 'male',
          otp_enabled: false,
          otp_verified: false,
          otp_ascii: null,
          otp_hex: null,
          otp_base32: null,
          otp_auth_url: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
