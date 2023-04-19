/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'teting@gmail.com',
          password: '123456789',
          roleId: 1,
          status: 'active',
          googleId: 1,
          gender: "male",
          otp_enabled: false,
          otp_verified: false,
          otp_ascii: null,
          otp_hex: null,
          otp_base32: null,
          otp_auth_url: null,
       }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};