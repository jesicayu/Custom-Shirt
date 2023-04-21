const express = require("express");
const cartController = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.post("/add/:id", cartController.addToCart);

cartRouter.delete("/delete/:id/:itemId", cartController.removeFromCart);

cartRouter.put("/edit/:id/:itemId", cartController.updateCartItemQuantity);

cartRouter.put("/checkout/:id", cartController.checkoutCart);

cartRouter.get("/:id", cartController.getActiveCart);

cartRouter.get("/history/:id", cartController.getFulfilledCarts);

module.exports = cartRouter;
