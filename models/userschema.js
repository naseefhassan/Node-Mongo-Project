const mongoose = require("mongoose");

const LoginnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: true },
});

const userDetails = new mongoose.model("details", LoginnSchema);

module.exports = userDetails;
