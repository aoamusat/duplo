"use strict";
const { faker } = require("@faker-js/faker");
const { generateAPIKey } = require("../../utils/helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const businesses = [];
      const industries = [
         "Finance",
         "Healthcare",
         "Retail",
         "Education",
         "Pharmaceutical",
         "Agriculture",
         "Other",
      ];
      for (let i = 0; i < 20; i++) {
         const ind = industries[Math.floor(Math.random() * industries.length)];
         businesses.push({
            name: faker.company.name(),
            type: faker.word.noun(),
            industry: ind,
            apiKey: generateAPIKey(),
            description: faker.lorem.paragraph(1),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
         });
      }

      await queryInterface.bulkInsert("businesses", businesses, {});
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("businesses", null, {});
   },
};
