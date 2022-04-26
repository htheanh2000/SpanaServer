const mongoose = require("mongoose");
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon"
    },
    name: String,
    type: String,
    description: String,
    price: String,
    coupon: Number,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
      }
    ,
  })
);
module.exports = Product;