const { Sequelize } = require("sequelize");
require("dotenv").config();

const Postgres = new Sequelize({
   dialect: "postgres",
   host: "localhost",
   username: "your_pg_user",
   password: "your_pg_password",
   database: "your_pg_database",
   define: {
      timestamps: false, // Disable Sequelize's default timestamps
   },
});

module.exports = Postgres;
