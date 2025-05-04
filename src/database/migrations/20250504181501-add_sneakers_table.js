'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('sneakers', {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      img: {
        type: sequelize.STRING,
        allowNull: true,
      },
      type_id: {
        type: sequelize.INTEGER,
        allowNull: true,
      },
      brand_id: {
        type: sequelize.INTEGER,
        allowNull: true,
      },
      rating: {
        type: sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sneakers');
  },
};
