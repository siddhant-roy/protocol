const mongoose = require("mongoose");

const TransactionReceiptSchema = new mongoose.Schema({
  transactionHash: {
    type: String,
    unique: true,
  },
  blockNumber: {
    type: Number,
  },
  fromAddress: {
    type: String,
  },
  toAddress: {
    type: String,
  },
  value: {
    type: String,
  },
  logs: {
    type: Array,
  },
});

module.exports = mongoose.model("TransactionReceipt", TransactionReceiptSchema);
