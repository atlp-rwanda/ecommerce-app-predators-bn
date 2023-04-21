'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        Name: 'Samsung Galaxy S21',
        description: 'Samsung Galaxy S21 is a smartphone that was tested with the Android 11 operating system. This model weighs 6.2 ounces, has a 6.2-inch touch screen display, 12-megapixel main camera, and 10-megapixel selfie camera. It comes with 8GB of RAM.',
        price: '1000',
        images: ['https://images-na.ssl-images-amazon.com/images/I/71ZtNda%2BguL._AC_SL1500_.jpg'],
        quantity: 10,
        expiryDate: new Date('2023-12-31'),
        vendor_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'iPhone 13',
        description: 'The iPhone 13 is the latest model of the Apple smartphone. It features a 6.1-inch Super Retina XDR display, A15 Bionic chip, 5G connectivity, and a dual-camera system. It comes with iOS 15 operating system and up to 1TB of storage.',
        price: '1200',
        images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-hero-pacific-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1631226032000', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-hero-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1631226031000'],
        quantity: 5,
        expiryDate: new Date('2024-12-31'),
        vendor_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more product data here...
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
