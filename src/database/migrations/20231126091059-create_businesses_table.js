"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("businesses", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         type: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         industry: {
            type: Sequelize.ENUM([
               "Finance",
               "Healthcare",
               "Retail",
               "Education",
               "Pharmaceutical",
               "Agriculture",
               "Other",
            ]),
            allowNull: false,
         },
         description: {
            type: Sequelize.TEXT,
            allowNull: true,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("businesses");
   },
};
