const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const { Order } = require("../database/models/schema/order");
const { Business } = require("../database/models/business.model");
const { Sequelize, EmptyResultError } = require("sequelize");

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
      return score;
   } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
   }
};

module.exports = { generateOrderRef, getCreditScore };
