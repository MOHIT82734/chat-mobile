const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  userName: String,
  text: String,
  sender: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
