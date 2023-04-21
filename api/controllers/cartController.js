const { Cart, Shirt_Customize, Shirt_Model, User } = require("../models");
const react = require("@heroicons/react");
const { RequestQuote } = require("@mui/icons-material");

exports.addToCart = (req, res) => {
  const { quantity, url, data } = req.body;
  const { color, size, style } = data;
  const { id } = req.params;

  if (!id) {
    return res.status(401).send("Unauthorized");
  }

  Cart.findOrCreate({ where: { userId: id, state: "active" } })
    .then(([cart]) => {
      Shirt_Model.findOne({ where: { color, size, style } }).then((model) => {
        cart
          .createItem({
            urlImage: url,
            quantity,
          })
          .then((customizedShirt) => {
            customizedShirt.setUser(id);
            customizedShirt.setModel(model).then(() => {
              cart
                .calculateTotalCost()
                .then(() => res.status(201).send("item added to cart"));
            });
          });
      });
    })
    .catch((err) => console.log(err, "error adding to cart"));
};

exports.removeFromCart = (req, res) => {
  const { id, itemId } = req.params;
  if (!id) {
    return res.status(401).send("Unauthorized");
  }
  Cart.findOne({ where: { userId: id, state: "active" } })
    .then((cart) => {
      Shirt_Customize.findByPk(itemId).then((foundShirt) => {
        cart.removeItem(foundShirt).then(() => {
          foundShirt.destroy().then(() => {
            cart
              .calculateTotalCost()
              .then(() => res.status(200).send("Item removed from cart"));
          });
        });
      });
    })

    .catch((err) => console.log(err, "error removing from cart"));
};

exports.updateCartItemQuantity = (req, res) => {
  const { id, itemId } = req.params;
  const { quantity } = req.body;
  Cart.findOne({ where: { userId: id, state: "active" } })
    .then((cart) => {
      cart.getItem({ where: { id: itemId } }).then((itemToUpdate) => {
        itemToUpdate[0].update({ quantity }).then(() => {
          cart
            .calculateTotalCost()
            .then(() => res.status(200).send("Item quantity updated"));
        });
      });
    })

    .catch((err) => console.log(err, "error updating cart"));
};

// ruta checkout para cerrar el carrito activo

exports.checkoutCart = (req, res) => {
  const { id } = req.params;
  Cart.findOne({ where: { userId: id, state: "active" } })
    .then((cart) => {
      cart
        .getItem({ include: { model: Shirt_Model, as: "model" } })
        .then((items) => {
          for (const item of items) {
            console.log("STOCK ACTUAL", item.model.stock);
            const updatedStock = item.model.stock - item.quantity;
            item.model
              .update({ stock: updatedStock })
              .then(() => console.log("STOCK POST", item.model.stock));
          }
        });
      cart.update({ state: "fulfilled" });
    })
    .then(() => res.status(200).send("Checkout complete"))
    .catch((err) => console.log(err, "error updating cart"));
};

// mostrar items del carrito actual

exports.getActiveCart = (req, res) => {
  const { id } = req.params;
  Cart.findOne({
    where: { userId: id, state: "active" },
    include: {
      model: Shirt_Customize,
      as: "item",
      include: { model: Shirt_Model, as: "model" },
    },
  })
    .then((foundCartWithItems) => {
      res.status(200).send(foundCartWithItems);
    })
    .catch((err) => console.log(err, "error finding active cart"));
};

// mostrar items de carritos anteriores

exports.getFulfilledCarts = (req, res) => {
  const { id } = req.params;
  Cart.findAll({
    where: { userId: id, state: "fulfilled" },
    include: {
      model: Shirt_Customize,
      as: "item",
      include: { model: Shirt_Model, as: "model" },
    },
  })
    .then((foundCarts) => {
      res.status(200).send(foundCarts);
    })
    .catch((err) => console.log(err, "error finding fulfilled carts"));
};
