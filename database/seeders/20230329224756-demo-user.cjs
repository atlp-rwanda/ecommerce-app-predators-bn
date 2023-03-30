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
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        },
        {
          id: 2,
          name: 'user2',
          email: 'user2@test.com',
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        },
        {
          id: 3,
          name: 'user3',
          email: 'user3@test.com',
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
