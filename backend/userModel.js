const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  number: Number,
  role: String
});

module.exports = mongoose.model("user", UserSchema);
