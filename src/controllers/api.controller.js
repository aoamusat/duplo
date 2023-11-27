const { Business } = require("../database/models/business.model");
const { Department } = require("../database/models/department.model");
const { Order } = require("../database/models/order.model");
const axios = require("axios");
const { getCreditScore } = require("../utils/helpers");

const apiIndex = async (request, response) => {
   const score = await getCreditScore(11);
   return response.json({
      message: "Duplo API service!",
      score: score,
   });
};

module.exports = { apiIndex };
