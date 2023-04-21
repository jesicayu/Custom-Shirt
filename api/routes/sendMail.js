const express = require("express");
const sendMailController = require("../controllers/sendMailController");
const sendMailRouter = express.Router();

sendMailRouter.get("/mailer/:id", sendMailController.sendMail);

module.exports = sendMailRouter;
