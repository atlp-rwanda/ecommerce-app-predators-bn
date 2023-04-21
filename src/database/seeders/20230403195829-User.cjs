// import { hasher } from '../../utils/hashPassword';

/** @type {import('sequelize-cli').Migration} */
  
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'yobuys@gmail.com',
          password:'$2y$10$bb.ZLaQkxDxLBvFadjr7A.MzYbGcinp68U/4svnM4JDNLJqgqhpRG',
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