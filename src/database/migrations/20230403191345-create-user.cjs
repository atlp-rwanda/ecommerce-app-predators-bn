<<<<<<< HEAD
=======
'use strict';
>>>>>>> 014521a (feat(sign-in-with-google): create the Google SignIn feature)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
<<<<<<< HEAD
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      googleId: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preferred_language: {
        type: Sequelize.STRING,
      },
      preferred_currency: {
        type: Sequelize.UUID,
=======
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:'active'
      },
      googleId: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      preferred_language: {
        type: Sequelize.STRING
      },
      preferred_currency: {
        type: Sequelize.UUID
      },
      otp_enabled: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      otp_verified: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      otp_ascii: {
        type: Sequelize.STRING,
      },
      otp_hex: {
        type: Sequelize.STRING,
      },
      otp_base32: {
        type: Sequelize.STRING,
      },
      otp_auth_url: {
        type: Sequelize.STRING,
>>>>>>> 014521a (feat(sign-in-with-google): create the Google SignIn feature)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
<<<<<<< HEAD

=======
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
>>>>>>> 014521a (feat(sign-in-with-google): create the Google SignIn feature)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
<<<<<<< HEAD
      },
=======
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
>>>>>>> 014521a (feat(sign-in-with-google): create the Google SignIn feature)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 014521a (feat(sign-in-with-google): create the Google SignIn feature)
};