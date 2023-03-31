'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'user1',
          email: 'user1@test.com',
        },
        {
          id: 2,
          name: 'user2',
          email: 'user2@test.com',
        },
        {
          id: 3,
          name: 'user3',
          email: 'user3@test.com',
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
