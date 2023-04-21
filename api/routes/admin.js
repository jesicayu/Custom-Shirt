const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

// Rutas para administrar productos
adminRouter.get("/:id", adminController.getProductById);
adminRouter.post("/", adminController.createProduct);
adminRouter.put("/:id", adminController.updateProduct);
adminRouter.delete("/remove/:id", adminController.deleteProductById);

module.exports = adminRouter;
