"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("orders", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         productName: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         status: {
            type: Sequelize.ENUM("SUCCESS", "PENDING", "FAILED"),
            defaultValue: "PENDING",
            allowNull: false,
         },
         orderReference: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
         },
         departmentId: {
            type: Sequelize.INTEGER,
            references: {
               model: "departments",
               key: "id",
            },
            allowNull: false,
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
      await queryInterface.dropTable("orders");
   },
};
