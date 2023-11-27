"use strict";
const { faker } = require("@faker-js/faker");
const { generateOrderRef } = require("../../utils/helpers");
const { Department } = require("../models/department.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const departments = await Department.findAll();
      const departmentIds = departments.map((department) => department.id);

      const orders = [];
      const statusOptions = ["SUCCESS", "PENDING", "FAILED"];
      for (let i = 0; i < 10000; i++) {
         const randomStatus =
            statusOptions[Math.floor(Math.random() * statusOptions.length)];
         orders.push({
            productName: faker.commerce.productName(),
            quantity: Math.floor(Math.random() * 5) + 1,
            amount: Math.floor(Math.random() * 100000) + 1000,
            status: randomStatus,
            orderReference: generateOrderRef(),
            departmentId:
               departmentIds[Math.floor(Math.random() * departmentIds.length)],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
         });
      }

      await queryInterface.bulkInsert("orders", orders, {});
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("orders", null, {});
   },
};
