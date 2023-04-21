const { User, Shirt_Model } = require("../models");

exports.getProductById = async (req, res) => {
  try {
    const product = await Shirt_Model.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(product);
  } catch (error) {
    console.log("Error desde adminController", error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Shirt_Model.bulkCreate(req.body);
    res.status(201).send(product);
  } catch (err) {
    console.log("error desde adminController", err);
  }
};

exports.updateProduct = async (req, res) => {
  const { description, color, style, price, stock, size, image } = req.body;
  const { id } = req.params;
  try {
    const product = await Shirt_Model.update(
      { description, color, style, price, stock, size, image },
      { where: { id }, returning: true, plain: true }
    );
    res.send(product);
  } catch (err) {
    console.log("error desde adminController", err);
  }
};

exports.deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Shirt_Model.destroy({ where: { id } });
    res.sendStatus(202);
  } catch (err) {
    console.log("error desde adminController", err);
  }
};
