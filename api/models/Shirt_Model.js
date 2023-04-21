const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Shirt_Model extends Model {}

Shirt_Model.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    style: {
      type: DataTypes.ENUM("tank", "short", "long", "v-neck"),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 0,
        max: 30000,
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.ENUM('white', 'blue', 'red', 'black', 'green'),
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM('S', 'M', 'L', 'XL'),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "shirt_model",timestamps: false }
);

module.exports = Shirt_Model;
