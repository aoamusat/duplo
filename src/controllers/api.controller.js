const { Business } = require("../database/models/business.model");
const { Department } = require("../database/models/department.model");
const { Order } = require("../database/models/order.model");
const axios = require("axios");
const { getCreditScore } = require("../utils/helpers");
const { Postgres } = require("../config/postgres");
const { QueryTypes } = require("sequelize");

const apiIndex = async (request, response) => {
   response.json({
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

const getOrderDetails = async (request, response) => {
   try {
      const businessId = request.user.id;
      const query = `SELECT COUNT
	( * ) AS totalOrders,
	SUM ( amount ) AS totalAmount,
	COUNT ( CASE WHEN DATE ( orders."createdAt" ) = CURRENT_DATE THEN 1 ELSE NULL END ) AS totalOrdersToday,
	SUM ( CASE WHEN DATE ( orders."createdAt" ) = CURRENT_DATE THEN amount ELSE 0 END ) AS totalAmountToday 
FROM
	orders
	JOIN departments ON orders."departmentId" = departments."id" 
WHERE
	departments."businessId" = :businessId`;

      const [results, metadata] = await Postgres.query(query, {
         replacements: { businessId },
         type: QueryTypes.SELECT,
         raw: false,
      });

      const data = {
         totalOrders: results.totalorders,
         totalAmount: results.totalamount,
         totalOrdersToday: results.totalorderstoday,
         totalAmountToday: results.totalamounttoday,
      };

      response.json(data);
   } catch (error) {
      console.log(error.message);
      response.status(500).json({
         message: "Internal Server Error",
      });
   }
};

module.exports = { apiIndex, getBusinessCreditScore, getOrderDetails };
