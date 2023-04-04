/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'alvin@gmail.com',
          password: '123456789',
          roleId: 1,
          status: 'active',
          googleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),

        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
