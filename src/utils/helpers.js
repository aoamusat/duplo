const { faker } = require("@faker-js/faker");
const crypto = require("crypto");
const { Order } = require("../database/models/schema/order");
const { Business } = require("../database/models/business.model");
const { EmptyResultError } = require("sequelize");
const { default: axios } = require("axios");

/**
 * Generates a random order reference using the Faker library.
 *
 * @returns {string} The generated order reference.
 */
const generateOrderRef = function () {
   return faker.string.uuid();
};

/**
 * Retrieves the credit score for a business based on its transaction history.
 *
 * @param {number} businessId - The ID of the business.
 * @returns {Promise<number>} The credit score for the business.
 * @throws {Error} If an error occurs during the process.
 */
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

/**
 * Generates a secure API key using a combination of timestamp and random bytes.
 *
 * @returns {string} The generated API key.
 */
const generateAPIKey = () => {
   const timestamp = Date.now().toString();
   const randomBytes = crypto.randomBytes(16).toString("hex");
   const apiKey = crypto
      .createHash("sha256")
      .update(timestamp + randomBytes)
      .digest("hex");
   return apiKey;
};

/**
 * Logs data to the tax authority endpoint.
 *
 * @param {Object} data - The data to be logged.
 * @returns {Promise<void>} A promise that resolves when the data is successfully logged.
 * @throws {Error} If an error occurs during the logging process.
 */
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
