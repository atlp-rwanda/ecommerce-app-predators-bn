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
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'user2',
          email: 'user2@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'user3',
          email: 'user3@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
