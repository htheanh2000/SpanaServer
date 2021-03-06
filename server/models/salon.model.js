const mongoose = require("mongoose");
const Salon = mongoose.model(
  "Salon",
  new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String,
    slogan: String,
    size: String,
    type: String,
    description: String,
    address: String,
    purpose: String,
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
      }
    ,
  })
);
module.exports = Salon;