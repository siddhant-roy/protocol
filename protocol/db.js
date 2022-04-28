const mongoose = require("mongoose");
const _ = require("lodash");
var config = require("./../config");
const hexModel = require("./models/hex.model");

mongoose
  .connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected on port "))
  .catch((err) => {
    console.log(err);
    process.exit();
  });

function addHex(userAddress, stakedhearts, stakeIndex) {
  return new Promise(async (resolve, reject) => {
    try {
      var userStatus = new hexModel({
        userAddress: userAddress,
        stakedhearts: stakedhearts,
        stakeIndex: stakeIndex,
      });
      hexModel.findOneAndUpdate(
        { userAddress: userAddress, stakeIndex: stakeIndex },
        userStatus,
        { upsert: true },
        function (err, doc) {
          resolve(doc);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  addHex: addHex,
};
