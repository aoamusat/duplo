const { Order } = require("../database/models/order.model");
const { Order: OrderSchema } = require("../database/models/schema/order");
const axios = require("axios");
const {
   getCreditScore,
   generateAPIKey,
   generateOrderRef,
   logData2TaxAuthority,
} = require("../utils/helpers");
const { Postgres } = require("../config/postgres");
const { QueryTypes } = require("sequelize");
const Joi = require("joi");

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

const createOrder = async (request, response) => {
   // TODO
   // - Create the order and save to PostgreSQL
   // - Log to Order to MongoDB
   // - Call the Tax authority with the order details
   try {
      const schema = Joi.object({
         productName: Joi.string().required(),
         quantity: Joi.number().integer().min(1).required(),
         status: Joi.string().valid("SUCCESS", "PENDING", "FAILED").required(),
         departmentId: Joi.number().integer().required(),
         amount: Joi.number().precision(2).positive().required(),
      });

      const { error: errors, value: data } = schema.validate(request.body);

      if (errors) {
         response.status(400).json({
            message: "Invalid request",
            errors: errors.details,
         });
         return;
      }

      const order = await Order.create({
         ...data,
         apiKey: generateAPIKey(),
         orderReference: generateOrderRef(),
      });

      await logData2TaxAuthority({
         order_id: order.orderReference,
         platform_code: "022",
         order_amount: data.amount,
      });

      await OrderSchema.create({
         businessID: request.user.id,
         status: data.status,
         amount: data.amount,
         date: new Date().toISOString(),
      });

      response.json(order);
   } catch (error) {
      console.log(error.message);
      response.status(500).json({
         message: "Internal Server Error",
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

module.exports = {
   apiIndex,
   getBusinessCreditScore,
   getOrderDetails,
   createOrder,
};
