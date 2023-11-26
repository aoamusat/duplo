"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn("orders", "amount", {
         allowNull: false,
         type: Sequelize.DECIMAL(10, 2),
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("orders", "amount");
   },
};
