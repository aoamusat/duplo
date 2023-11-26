const { DataTypes, Model } = require("sequelize");
const { Postgres } = require("../../config/postgres");
const { Department } = require("./department");

class Order extends Model {
   static associate(models) {}
}

Order.init(
   {
      productName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      amount: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM(["SUCCESS", "PENDING", "FAILED"]),
         defaultValue: "PENDING",
         allowNull: false,
      },
      orderReference: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      departmentId: {
         type: DataTypes.INTEGER,
         references: {
            model: Department,
            key: "id",
         },
         allowNull: false,
      },
   },
   {
      sequelize: Postgres,
      modelName: "Order",
      tableName: "orders",
   },
);

module.exports = { Order };
