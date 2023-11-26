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
               "Technology",
               "Finance",
               "Healthcare",
               "Retail",
               "Education",
               "Manufacturing",
               "Entertainment",
               "Telecommunications",
               "Transportation",
               "Hospitality",
               "Energy",
               "Automotive",
               "Agriculture",
               "Construction",
               "Media",
               "Real Estate",
               "Pharmaceutical",
               "Biotechnology",
               "Environmental",
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
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("businesses");
   },
};
