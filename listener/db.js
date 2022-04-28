const mongoose = require("mongoose");
const _ = require("lodash");
const transactionReceiptModel = require("./model/transactionReceipt.model");
const protocolModel = require("./model/protocol.model");

mongoose
  .connect(
    process.env.MONGODB_URL ||
      "mongodb://sam:samisop@35.236.8.167/trDB?authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongoDB connected on port "))
  .catch((err) => {
    console.log(err);
    process.exit();
  });

function addTransactionReceipt(
  transactionHash,
  blockNumber,
  from,
  to,
  value,
  logs,
  timestamp
) {
  return new Promise(async (resolve, reject) => {
    try {
      var newTransaction = new transactionReceiptModel({
        transactionHash: transactionHash ? transactionHash.toLowerCase() : null,
        blockNumber: blockNumber,
        fromAddress: from ? from.toLowerCase() : null,
        toAddress: to ? to.toLowerCase() : null,
        value: value ? value.toLowerCase() : null,
        logs: logs,
        timestamp: timestamp,
      });
      var doc = await newTransaction.save();
      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
}

async function getProtocols() {
  try {
    let protocolList = await protocolModel.find({});
    if (!_.isEmpty(protocolList)) return protocolList;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addTransactionReceipt: addTransactionReceipt,
  getProtocols: getProtocols,
};
