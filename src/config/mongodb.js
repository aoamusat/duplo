require("dotenv").config();

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || "";

mongoose.connect(mongoURI);

const MongoDB = mongoose.connection;

MongoDB.on("error", (error) => {
   console.error("MongoDB connection error:", error.message);
});

MongoDB.once("open", () => {
   console.log("Connected to MongoDB successfully");
});

module.exports = { MongoDB };
