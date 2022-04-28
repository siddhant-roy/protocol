var startBlock = process.env.START || 14455763;
var endBlock = process.env.END || 14455776;
const db = require("./db");
const config = require("./../config");
const ethers = require("ethers");
const Web3 = require("web3");
const _ = require("lodash");
const provider = new ethers.providers.JsonRpcProvider(config.provider);
const web3 = new Web3(config.provider);
const protocolService = require("../protocol/protocols");
const Protocols = require("../protocol/protocols/index");
const { performance } = require("perf_hooks");

const fs = require("fs");

function runFunction(name, args) {
  var fn = window[name];
  if (typeof fn !== "function") return;
  fn.apply(window, args);
}

(async () => {
  try {
    var entryPoints = {};
    while (true) {
      for (var iterBlock = startBlock; iterBlock <= endBlock; ++iterBlock) {

        var blockNumber = "0x" + iterBlock.toString(16);
        const data = await web3.eth.getBlock(parseInt(blockNumber, 16));
        var transactions = data.transactions;

        console.log("Block number " + iterBlock + " has been fetched");

        var protocols = await db.getProtocols();
        console.log(protocols);

        for (let i = 0; i < protocols.length; i++)
          entryPoints[protocols[i].entryPoint] = protocols[i].name;
        
        for( let x in entryPoints) {
          console.log(entryPoints[x]+"\t"+x);
        }

        if (!_.isEmpty(transactions)) {
          for (
            let iterTransaction = 0;
            iterTransaction < transactions.length;
            ++iterTransaction
          ) {

            var hashValue = transactions[iterTransaction];
            const txr = await provider.waitForTransaction(hashValue);

            if (!_.isEmpty(txr.logs)) {
              // await db.addTransactionReceipt(
              //   txr.transactionHash,
              //   txr.blockNumber,
              //   txr.from,
              //   txr.to,
              //   txr.value,
              //   txr.logs
              // );

              console.log(
                "TRANSACTION_RECEIPT[" +
                  iterTransaction +
                  "] for block number " +
                  parseInt(blockNumber, 16) +
                  " added\n"
              );

              // const promises = [];

              // const logs = [];
              const protocolTopics = {};
              let protocol, topic0;
              let isEmpty = true;

              // let timeA = performance.now();

              for (let log of txr.logs) {

                if (log.address in entryPoints) {
                  console.log(txr.to + "interacted with hex");
                  // promises.push(Protocols.process(txr, txr.logs[iterLogs].address));
                  // await Protocols.process(txr, txr.logs[iterLogs].address);
                  protocol = entryPoints[log.address];
                  topic0 = log.topics[0]
                  // logs.push({
                  //   protocol,
                  //   topic0
                  // })
                  
                  if (!(protocol in protocolTopics)) {
                    protocolTopics[protocol] = new Set();
                    isEmpty = false;
                  }
                  protocolTopics[protocol].add(topic0);
                }
              }

              const res = {
                from : txr.from,
                to : txr.to,
                // logs,
                protocolTopics
              }

              if(!isEmpty) {
                console.log(res)
                await Protocols.process(txr, res);
              }

              // await Promise.all(promises);
              // let timeB = performance.now();
              // console.log("Time : ", timeB-timeA);
            }
          }
        } else {
          console.log("Transactions empty for " + iterBlock);
        }
      }

      var latestBlockNumber = await provider.getBlockNumber();
      if (endBlock < latestBlockNumber) {
        startBlock = endBlock + 1;
        endBlock = latestBlockNumber;
      }

      break
    }

  } catch (error) {
    console.log(error);
  }
})();
