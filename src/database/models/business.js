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
            "Technology",
            "Finance",
            "Healthcare",
            "Retail",
            "Education",
            "Manufacturing",
            "Entertainment",
            "Telecommunications",
            "Transportation",
            "Hospitality",
            "Energy",
            "Automotive",
            "Agriculture",
            "Construction",
            "Media",
            "Real Estate",
            "Pharmaceutical",
            "Biotechnology",
            "Environmental",
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
