'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',
     [
       {
          name: 'John rr',
          email: 'alvin@gmail.com',
          password: '123456789',
          roleId: 1,
          status: 'active',
          googleId: 1,

       }
    ]
      , {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
