const { DataTypes, Model } = require("sequelize");
const { Postgres } = require("../../config/postgres");
const { Order } = require("./order");
const { Business } = require("./business");

class Department extends Model {
   static associate(models) {
      this.hasMany(Order, {
         foreignKey: "departmentId",
         as: "orders",
      });
   }
}

Department.init(
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      businessId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: Business,
            key: "id",
         },
      },
   },
   {
      sequelize: Postgres,
      modelName: "Department",
      tableName: "departments",
   },
);

module.exports = { Department };
