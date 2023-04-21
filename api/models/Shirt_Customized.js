const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Shirt_Customize extends Model {}

Shirt_Customize.init(
  {
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:1,
        max:6
      }
    },
  },
  { sequelize: db, modelName: "shirt_customize", timestamps: false }
);

module.exports = Shirt_Customize;
