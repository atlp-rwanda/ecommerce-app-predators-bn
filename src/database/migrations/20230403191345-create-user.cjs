/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      },
      streetAddressOne: {
        type: Sequelize.STRING,
      },
      streetAddressTwo: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      postalOrZIPCode: {
        type: Sequelize.STRING,
      },
      preferred_language: {
        type: Sequelize.STRING,
      },
      preferred_currency: {
        type: Sequelize.UUID,
      },
      otp_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      otp_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      otp_ascii: {
        type: Sequelize.STRING,
        allowNull: true
      },
      otp_hex: {
        type: Sequelize.STRING,
        allowNull: true
      },
      otp_base32: {
        type: Sequelize.STRING,
        allowNull: true
      },
      otp_auth_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
