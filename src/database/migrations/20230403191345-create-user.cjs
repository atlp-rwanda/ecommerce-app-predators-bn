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
        allowNull: false,
        defaultValue:'active'
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
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};