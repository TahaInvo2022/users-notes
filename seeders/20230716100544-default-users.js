'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcrypt");

const password = "password";
const hsh = bcrypt.hashSync(password, 6);

const TABLE_NAME = 'users'

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert(TABLE_NAME, [
      {
        name: 'admin',
        email: "admin@admin.com",
        password: hsh,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'test',
        email: "test@test.com",
        password: hsh,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  }
};
