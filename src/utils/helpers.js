const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { Order } = require("../database/models/schema/order");
const { Business } = require("../database/models/business.model");
const { Sequelize, EmptyResultError } = require("sequelize");
const { default: axios } = require("axios");

const generateOrderRef = function () {
   return faker.string.uuid();
};

const getCreditScore = async (businessId) => {
   try {
      const business = await Business.findByPk(businessId);
      if (!business) {
         throw new EmptyResultError("Business not found!");
      }
      const result = await Order.aggregate([
         {
            $match: {
               businessID: businessId,
            },
         },
         {
            $group: {
               _id: "$businessID",
               totalTransactionCount: { $sum: 1 },
               totalTransactionAmount: { $sum: "$amount" },
            },
         },
      ]);

      const data = result[0] || {
         totalTransactionCount: 0,
         totalTransactionAmount: 0,
      };
      const score =
         data.totalTransactionAmount / (data.totalTransactionCount * 100);
      return Math.ceil(score);
   } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
   }
};

const generateAPIKey = () => {
   const timestamp = Date.now().toString();
   const randomBytes = crypto.randomBytes(16).toString("hex");
   const apiKey = crypto
      .createHash("sha256")
      .update(timestamp + randomBytes)
      .digest("hex");
   return apiKey;
};

const logData2TaxAuthority = async (data) => {
   try {
      await axios.post("https://taxes.free.beeceptor.com/log-tax", data);
   } catch (error) {
      console.log(error.message);

      // TODO: Push to queue for future retry
   }
};

module.exports = {
   generateOrderRef,
   getCreditScore,
   generateAPIKey,
   logData2TaxAuthority,
};
