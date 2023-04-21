const User = require("./User");
const Shirt_Model = require("./Shirt_Model");
const Shirt_Customize = require("./Shirt_Customized");
const Cart = require("./Cart");

// User and Cart relationship
Cart.belongsTo(User);
User.hasMany(Cart);

// Cart_Item and Cart relationship
Shirt_Customize.belongsTo(Cart);
Cart.hasMany(Shirt_Customize, {
  as: "item",
  foreignKey: "cartId",
});

// Shirt_Customize and User relationship
Shirt_Customize.belongsTo(User);
User.hasMany(Shirt_Customize);

// Shirt_Customize and Shirt_Model relationship
Shirt_Customize.belongsTo(Shirt_Model, { as: "model" });
Shirt_Model.hasMany(Shirt_Customize, {
  as: "customizations",
  foreignKey: "modelId",
}); // se agrega una clave shirtModelId a Shirt_Customize, pero al tener foreignKey la clave sera modelId

module.exports = { User, Shirt_Customize, Shirt_Model, Cart };
