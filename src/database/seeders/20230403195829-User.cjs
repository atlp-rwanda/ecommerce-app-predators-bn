<<<<<<< HEAD
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
=======
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',
     [
       {
          name: 'John rr',
>>>>>>> e28c4c4 (feat(sign-in-with-google): create the Google SignIn feature)
          email: 'alvin@gmail.com',
          password: '123456789',
          roleId: 1,
          status: 'active',
          googleId: 1,
<<<<<<< HEAD
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
=======

       }
    ]
      , {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
>>>>>>> e28c4c4 (feat(sign-in-with-google): create the Google SignIn feature)
