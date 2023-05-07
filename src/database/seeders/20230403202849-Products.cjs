/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Samsung Galaxy S21',
        description: 'Samsung Galaxy S21 is a smartphone that was tested with the Android 11 operating system. This model weighs 6.2 ounces, has a 6.2-inch touch screen display, 12-megapixel main camera, and 10-megapixel selfie camera. It comes with 8GB of RAM.',
        price: '1000',
        picture_urls: ['https://images-na.ssl-images-amazon.com/images/I/71ZtNda%2BguL._AC_SL1500_.jpg'],
        instock: 10,
        available: true,
        expiryDate: new Date('2023-12-31'),
        vendor_id: 2,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'iPhone 13',
        description: 'The iPhone 13 is the latest model of the Apple smartphone. It features a 6.1-inch Super Retina XDR display, A15 Bionic chip, 5G connectivity, and a dual-camera system. It comes with iOS 15 operating system and up to 1TB of storage.',
        price: '1200',
        picture_urls: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-hero-pacific-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1631226032000', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-hero-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1631226031000'],
        instock: 5,
        expiryDate: new Date('2024-12-31'),
        vendor_id: 2,
        available: false,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "name": "Sumsang 1111TV 52 inch",
        "description": "New brand for sale",
        "category_id": 1,
        "price": 800,
        "picture_urls": [
            "https://example.com/picture1.jpg",
            "https://example.com/picture2.jpg",
            "https://example.com/picture3.jpg",
            "https://example.com/picture4.jpg"
        ],
        "instock": 0,
        "expiryDate": "2000-11-30T22:00:00.000Z",
        "available": true,
        "vendor_id": 2,
        "createdAt": "2023-05-08T11:26:25.927Z",
        "updatedAt": "2023-05-08T11:46:05.856Z"
    },
    {
        "name": "Iphone1111 13 pro",
        "description": "New brand for sale",
        "category_id": 1,
        "price": 800,
        "picture_urls": [
            "https://example.com/picture1.jpg",
            "https://example.com/picture2.jpg",
            "https://example.com/picture3.jpg",
            "https://example.com/picture4.jpg"
        ],
        "instock": 0,
        "expiryDate": "2000-11-30T22:00:00.000Z",
        "available": true,
        "vendor_id": 2,
        "createdAt": "2023-05-08T13:48:23.916Z",
        "updatedAt": "2023-05-08T14:11:33.373Z"
    },
    {
        "name": "Iphone 12",
        "description": "New brand ",
        "category_id": 1,
        "price": 120000,
        "picture_urls": [
            "https://example.com/picture1.jpg",
            "https://example.com/picture2.jpg",
            "https://example.com/picture3.jpg",
            "https://example.com/picture4.jpg"
        ],
        "instock": 0,
        "expiryDate": "2000-11-30T22:00:00.000Z",
        "available": true,
        "vendor_id": 2,
        "createdAt": "2023-05-08T14:15:42.837Z",
        "updatedAt": "2023-05-08T14:57:01.656Z"
    },
    {
        "name": "logitech111 master",
        "description": "mouse",
        "category_id": 2,
        "price": 2000,
        "picture_urls": [
            "https://example.com/picture1.jpg",
            "https://example.com/picture2.jpg",
            "https://example.com/picture3.jpg",
            "https://example.com/picture4.jpg"
        ],
        "instock": 199,
        "expiryDate": "2000-11-30T22:00:00.000Z",
        "available": true,
        "vendor_id": 2,
        "createdAt": "2023-05-08T17:00:37.911Z",
        "updatedAt": "2023-05-08T17:10:42.770Z"
    }
      // Add more product data here...
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
