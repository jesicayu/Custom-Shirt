const { Model, DataTypes } = require("sequelize");
const db = require("../db");
const Shirt_Model = require("./Shirt_Model");

class Cart extends Model {
 calculateTotalCost(){
  return this.getItem({include:{model:Shirt_Model, as: "model"}}).then(items=>{
    const totalCost = items.reduce((acc,item) =>{
      return acc + (item.quantity * item.model.price)
    },0)
    return this.update({totalCost})
  })
 }
}

Cart.init(
  {
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  { sequelize: db, modelName: "cart" }
);

// Cart.addHook("afterUpdate", (cart) => {
//   return cart.getItems().then((items) => {
//     const totalCost = items.reduce((acc, item) => {
//       return acc + item.quantity * item.model.price;
//     }, 0);
//     return cart.update({ totalCost });
//   });
// });

module.exports = Cart;
