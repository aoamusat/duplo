"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn("businesses", "apiKey", {
         allowNull: false,
         type: Sequelize.STRING,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("businesses", "apiKey");
   },
};
