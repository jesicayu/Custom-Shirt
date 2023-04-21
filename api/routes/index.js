const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./products");
const cartRouter = require("./cart");
const adminRouter = require("./admin");
const sendMailRouter = require("./sendMail");

router.use("/cart", cartRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/products", productRouter);
router.use("/sendMail", sendMailRouter);

module.exports = router;
