const mongoose = require("mongoose");
const { Schema } = mongoose;
const { MongoDB } = require("../../../config/mongodb");

const OrderSchema = new Schema({
   businessID: Number,
   amount: Schema.Types.Decimal128,
   status: Schema.Types.String,
   date: Schema.Types.String,
});

const Order = MongoDB.model("Order", OrderSchema);

module.exports = { Order };
