const { User, Shirt_Model, Shirt_Customize } = require("../models");
const sequelize = require("sequelize");

exports.getProducts = async (req, res) => {
  try {
    const products = await Shirt_Model.findAll();
    res.send(products);
  } catch (error) {
    console.log("Error desde productsController", error);
  }
};

exports.getProductsByColorAndSize = async (req, res) => {
  try {
    const products = await Shirt_Model.findAll({
      attributes: [
        "style",
        "description",
        [sequelize.fn("min", sequelize.col("price")), "minPrice"],
        [sequelize.fn("max", sequelize.col("price")), "maxPrice"],
        [
          sequelize.literal(
            "(SELECT image FROM shirt_models AS sm WHERE sm.style = shirt_model.style AND sm.color = 'white' LIMIT 1)"
          ),
          "image",
        ],
      ],
      group: ["style", "description"],
    });
    res.send(products);
  } catch (error) {
    console.log("Error desde productsController", error);
  }
};

exports.getShirtByStyleColorAndSize = async (req, res) => {
  const { style, color, size } = req.params;
  try {
    const product = await Shirt_Model.findOne({
      where: {
        color: color,
        style: style,
        size: size,
      },
    });
    res.send(product);
  } catch (error) {
    console.log("Error desde productsController", error);
  }
};

exports.getColorsForModel = async (req, res) => {
  const { style } = req.params;
  try {
    const colorsFound = await Shirt_Model.findAll({
      where: { style: style },
      attributes: ["color"],
      group: ["color"],
    });
    const colors = colorsFound.map((colorObj) => colorObj.color);
    res.send(colors);
  } catch (error) {
    console.log("Error desde productsController", error);
  }
};

exports.getSizesForModel = async (req, res) => {
  const { style } = req.params;
  try {
    const sizesFound = await Shirt_Model.findAll({
      where: { style: style },
      attributes: ["size"],
      group: ["size"],
    });
    const sizes = sizesFound.map((sizeObj) => sizeObj.size);
    res.send(sizes);
  } catch (error) {
    console.log("Error desde productsController", error);
  }
};

exports.createShirtCustomized = async (req, res) => {
  const { data, url, quantity } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    const shirtCustom = await Shirt_Customize.create({ urlImage: url, quantity });
    await shirtCustom.setUser(user.id);
    await shirtCustom.setModel(data.id);
  } catch (error) {
    console.log("Error desde productsController", error);
  }
};
