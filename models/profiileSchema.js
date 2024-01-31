const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  UserId: { type: mongoose.Types.ObjectId, required: true },
  DOB: { type: String, required: true },
  age: { type: Number, required: true },
  Gender: { type: String, required: true },
  PhoneNumber: { type: Number, required: true },
});

const profile = new mongoose.model("profiles", ProfileSchema);

module.exports = profile;
