const Web3 = require("web3");
const ethers = require("ethers");
const abi = require("./../abis/alpha.abi.json");
var config = require("./../../config");

const alphaStaking = "0x2aA297c3208bD98a9a477514d3C80ace570A6deE";

const fetch = async (_txHash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.provider);
      const txReceipt = await provider.waitForTransaction(_txHash);
      const Web3Client = new Web3(
        new Web3.providers.HttpProvider(config.provider)
      );
      const stakingInstance = new Web3Client.eth.Contract(abi, alphaStaking);
      const decimals = 18;
      const stake = await stakingInstance.methods
        .getStakeValue(txReceipt.from)
        .call();

      const balance = (stake / 10 ** decimals).toFixed(2);

      console.log("balance:", balance, "ALPHAbbbb");
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

fetch("0xe3069884f338fc805e22cebdb701f91f9deb8fbdf7c11f9760fb97510c371836");

// module.exports = {
//   fetch: fetch,
// };
