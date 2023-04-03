'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        Name: 'Product 1',
        description: 'Product 1 description',
        price: '100',
        vendor_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      } 
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});

  }
};
