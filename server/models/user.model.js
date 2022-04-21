const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    is_deleted: {
      type: String,
      default: false
    }
  })
);
module.exports = User;