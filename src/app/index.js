require("dotenv").config();
const express = require("express");
const { Order } = require("../database/models/schema/order");
const APIRouter = require("../routes/api.route");

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());
app.use("/api/v1/", APIRouter);

module.exports = { app, PORT };
