'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('types', [
      {
        name: `Male`,
        created_at: now,
        updated_at: now,
      },
      {
        name: `Female`,
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Children',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
  },
};
