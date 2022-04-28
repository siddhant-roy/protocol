const mongoose = require("mongoose");

const HexSchema = new mongoose.Schema(
  {
    userAddress: {
      type: String,
    },
    stakedHearts: {
      type: String,
      default: "",
    },
    stakeIndex: {
      type: Number,
    },
  },
  { autoCreate: false }
);

module.exports = mongoose.model("Hex", HexSchema, "hex");
