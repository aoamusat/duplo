"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("departments", {
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
         description: {
            type: Sequelize.TEXT,
            allowNull: true,
         },
         businessId: {
            type: Sequelize.INTEGER,
            references: {
               model: "businesses",
               key: "id",
            },
            allowNull: false,
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

      // Adding foreign key constraint
      await queryInterface.addConstraint("departments", {
         fields: ["businessId"],
         type: "foreign key",
         name: "fk_department_business",
         references: {
            table: "businesses",
            field: "id",
         },
         onDelete: "cascade",
         onUpdate: "cascade",
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("departments");
   },
};
