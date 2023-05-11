// import { hasher } from '../../utils/hashPassword';

/** @type {import('sequelize-cli').Migration} */
  
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          email: 'andelapreda@gmail.com',
          password:'PredatorAdmin@1',
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

      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
