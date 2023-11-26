const { faker } = require("@faker-js/faker");
const generateOrderRef = function () {
   return "DPL" + faker.string.uuid().toUpperCase();
};

module.exports = { generateOrderRef };
