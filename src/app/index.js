require("dotenv").config();
const express = require("express");
const { Business } = require("../database/models/business");

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());

app.get("/", async (request, response) => {
   const biz = await Business.findAll();
   response.json({ message: "Hello Duplo!", businesses: biz });
});

module.exports = { app, PORT };
