const mongoose = require("mongoose");
const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    name: String,
    link: String
  })
);
module.exports = Image;