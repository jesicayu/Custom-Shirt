const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/productsController");

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/styles", productsController.getProductsByColorAndSize);

productsRouter.get("/colors/:style", productsController.getColorsForModel);

productsRouter.get("/sizes/:style", productsController.getSizesForModel);

productsRouter.get(
  "/styles/:style/:color/:size",
  productsController.getShirtByStyleColorAndSize
);

productsRouter.post(
  "/shirtCustomized/:id",
  productsController.createShirtCustomized
);

module.exports = productsRouter;
