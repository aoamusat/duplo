"use strict";
const { faker } = require("@faker-js/faker");
const { Business } = require("../models/business.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const businesses = await Business.findAll();
      const businessIds = businesses.map((business) => business.id);
      const startDate = new Date("2023-09-01T00:00:00Z").getTime();
      const departments = [];
      for (let i = 0; i < 5000; i++) {
         const now = new Date().getTime();
         const randomDate = new Date(
            startDate + Math.random() * (now - startDate),
         );
         departments.push({
            name: faker.commerce.department(),
            description: faker.lorem.paragraph(1),
            businessId:
               businessIds[Math.floor(Math.random() * businessIds.length)],
            createdAt: randomDate.toISOString(),
            updatedAt: randomDate.toISOString(),
         });
      }

      await queryInterface.bulkInsert("departments", departments, {});
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("departments", null, {});
   },
};
