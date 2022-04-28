const Web3 = require("web3");
const ethers = require("ethers");
var config = require("./../../config");
const abi = require("./../abis/rainmaker.abi.json");
const abi2 = require("./../abis/rainmaker.abi2.json");
const poolAbi = require("./../abis/rainmaker.poolAbi.json");
var contractAddress = "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39";

const RainmakerFetch = async (_txHash) => {
  try {
    //const provider = new ethers.providers.JsonRpcProvider(config.provider);
    const txReceipt = await provider.waitForTransaction(_txHash);
    const Web3Client = new Web3(
      new Web3.providers.HttpProvider(config.provider)
    );
    const instance = new Web3Client.eth.Contract(
      abi,
      "0x64c2EfCF94129656F1C859E92120252844162513"
    );
    var address = "0xa595bd09f760da8c5efcaa67b889cbc7f6665ec3";

    const decimals = 18;

    const stakedBalance = await instance.methods
      .getTotalDeposit(address)
      .call();
    console.log("staked balance:", (stakedBalance / 10 ** decimals).toFixed(2));

    const cummalativeRewards = await instance.methods
      .cumulativeRewardsOf(address)
      .call();
    console.log(
      "cummalative rewards:",
      (cummalativeRewards / 10 ** decimals).toFixed(2)
    );
    const hexTopics = [
      "0x14872dc760f33532684e68e1b6d5fd3f71ba7b07dee76bdb2b084f28b74233ef",
      "0x72d9c5a7ab13846e08d9c838f9e866a1bb4a66a2fd3ba3c9e7da3cf9e394dfd7",
      "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
      "0xd824970a2cf19cc2b630c87ce5b00f67301cac3ac60513d027c7a39129f93b46",
    ];
    var fetchFlag = false;
    for (let i = 0; i < txReceipt.logs.length; i++) {
      if (
        txReceipt.logs[i].address == contractAddress &&
        hexTopics.includes(txReceipt.logs[i].topics[0])
      )
        fetchFlag = true;
      console.log(txReceipt.logs[i].address);
    }
  } catch (err) {
    console.log(err);
  }
};

RainmakerFetch(
  "0x214d74e7a2b1b2c2c0bc0161274463acf96a3509fe4b3699aa459a44ff2f8968"
);
