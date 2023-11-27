const { Business } = require("../database/models/business.model");
const { Department } = require("../database/models/department.model");
const { Order } = require("../database/models/order.model");
const axios = require("axios");
const { getCreditScore } = require("../utils/helpers");

const apiIndex = async (request, response) => {
   return response.json({
      message: "Duplo API service!",
   });
};

const getBusinessCreditScore = async (request, response) => {
   try {
      const businessId = request.user.id;
      const score = await getCreditScore(businessId);
      response.json({
         creditScore: score,
      });
   } catch (error) {
      console.log(error.message);
      return response.status(500).json({
         error: "An error occurred while processing credit score. Our team will be notified of this error.",
      });
   }
};

module.exports = { apiIndex, getBusinessCreditScore };
