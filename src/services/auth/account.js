require("dotenv").config();

const { Business } = require("../../database/models/business.model");

const authenticate = async (request, response, next) => {
   const { apiKey } = request.headers;
   const business = await Business.findOne({
      where: {
         apiKey: apiKey,
      },
   });

   if (business) {
      request.user = business;
      return next();
   } else {
      response.status(401).json({
         message: "Not authorized!",
      });
   }
};

module.exports = { authenticate };
