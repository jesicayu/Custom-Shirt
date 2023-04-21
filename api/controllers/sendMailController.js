const { Cart, User, Shirt_Customize } = require("../models");
const transporter = require("../config/mailer");

exports.sendMail = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    const foundCartWithItems = await Cart.findOne({
      where: { userId: id, state: "active" },
    });
    await transporter.sendMail({
      from: "CustomShirt@empresa.com",
      to: user.email,
      subject: "Aqui tienes tu detalle de la compra!!!!",
      text: "Confirma tu compra",
      html: `<h1>Hola ${user.first_name}!!</h1> <h2>Gracias por tu compra</h2> <h3>Total pagado: ${foundCartWithItems.totalCost}</h3>`,
    });
    res.send("Your order is completed!");
  } catch (err) {
    console.log(err, "error finding active cart");
  }
};
