const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userAddress: {
    type: String,
  },
  protocolName: {
    type: String,
  },
  chain: {
    type: String,
  },
  poolName: {
    type: String,
  },
  balance: {
    type: Number,
  },
  balanceSymbol: {
    type: String,
  },
  rewards: {
    type: Number,
  },
  rewardsSymbol: {
    type: String,
  },
}, {
  timestamps : true
});

module.exports = mongoose.model("TestUser", UserSchema);
