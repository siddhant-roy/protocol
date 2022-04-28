// try {
//   exports.hex = require("./hex.protocol");
// } catch (err) {
//   console.log(err);
// }

const protocolModel = require("./../../listener/model/protocol.model");

function process(txr, entryPoint) {
  return new Promise(async (resolve, reject) => {
    try {
      let protocolData = await protocolModel.findOne({
        entryPoint: entryPoint,
      });
      let typeProtocol = require(protocolData.name + ".protocol.js");

      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  process: process,
};
