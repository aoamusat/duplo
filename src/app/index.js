require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());

app.get("/", async (request, response) => {
   response.json({ message: "Hello Duplo!", orders: orders });
});

module.exports = { app, PORT };
