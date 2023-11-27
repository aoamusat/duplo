"use strict";
const { faker } = require("@faker-js/faker");
const { Business } = require("../models/business.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const businesses = await Business.findAll();
      const businessIds = businesses.map((business) => business.id);

      const departments = [];
      for (let i = 0; i < 100; i++) {
         departments.push({
            name: faker.commerce.department(),
            description: faker.lorem.paragraph(1),
            businessId:
               businessIds[Math.floor(Math.random() * businessIds.length)],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
         });
      }

      await queryInterface.bulkInsert("departments", departments, {});
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("departments", null, {});
   },
};
