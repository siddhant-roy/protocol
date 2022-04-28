const mongoose = require("mongoose");

const ProtocolSchema = new mongoose.Schema({
  entryPoint: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Protocol", ProtocolSchema);
