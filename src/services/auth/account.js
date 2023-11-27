require("dotenv").config();

const { Department } = require("../../database/models/department.model");

const authenticate = async (request, response, next) => {
   const { apiKey } = request.headers;
   const department = await Department.findOne({
      where: {
         apiKey: apiKey,
      },
   });

   if (department) {
      request.user = department;
      return next();
   } else {
      response.status(401).json({
         message: "Not authorized!",
      });
   }
};

module.exports = { authenticate };
