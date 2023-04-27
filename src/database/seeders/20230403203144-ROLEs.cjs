/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ROLES', [
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
      {
        name: 'vender',
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ROLES', null, {});
  },
};
