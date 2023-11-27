require("dotenv").config();

const { Business } = require("../../database/models/business.model");

const authenticate = async (request, response, next) => {
   const { apikey: apiKey } = request.headers;
   if (!apiKey) {
      response.status(400).json({
         message: "API Key required!",
      });
      return;
   }

   try {
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
   } catch (error) {
      console.error("Error during authentication:", error);
      response.status(500).json({
         message: "Internal Server Error",
      });
   }
};

module.exports = { authenticate };
