const Sequelize = require("sequelize");
require("dotenv").config();

const Postgres = new Sequelize({
   dialect: "postgres",
   host: process.env.PG_HOST,
   username: process.env.PG_USERNAME,
   password: process.env.PG_PASSWORD,
   database: process.env.PG_DATABASE,
   define: {
      timestamps: true,
   },
});

Postgres.authenticate()
   .then(() => {
      console.log("Connected to Postgres successfully!");
   })
   .catch((error) => {
      console.error("Unable to connect to the database: ", error.message);
   });

module.exports = { Postgres };
