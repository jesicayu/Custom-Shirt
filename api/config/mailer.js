const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "julianrinaudo18@gmail.com",
      pass: "ezahydvasdweaifp",
    },
  });

module.exports = transporter