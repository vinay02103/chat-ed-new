const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  interests: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
