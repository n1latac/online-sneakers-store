'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('brands', [
      {
        name: 'Adidas',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Nike',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Asics',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'New Balance',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Fila',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  },
};
