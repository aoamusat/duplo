const { DataTypes, Model } = require("sequelize");
const { Postgres } = require("../../config/postgres");
const { Department } = require("./department");

class Business extends Model {
   static associate(models) {
      this.hasMany(Department, {
         foreignKey: "businessId",
         as: "departments",
      });
   }
}

Business.init(
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      type: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      industry: {
         type: DataTypes.ENUM([
            "Finance",
            "Healthcare",
            "Retail",
            "Education",
            "Pharmaceutical",
            "Agriculture",
            "Other",
         ]),
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
   },
   {
      sequelize: Postgres,
      modelName: "Business",
      tableName: "businesses",
   },
);

module.exports = { Business };
