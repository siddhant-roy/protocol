const Web3 = require("web3");
const ethers = require("ethers");
var config = require("./../../config");
const { builtinModules } = require("module");
const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "data0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "data1",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "stakerAddr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint40",
        name: "stakeId",
        type: "uint40",
      },
    ],
    name: "StakeEnd",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "data0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "data1",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "stakerAddr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint40",
        name: "stakeId",
        type: "uint40",
      },
      {
        indexed: true,
        internalType: "address",
        name: "senderAddr",
        type: "address",
      },
    ],
    name: "StakeGoodAccounting",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "data0",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "stakerAddr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint40",
        name: "stakeId",
        type: "uint40",
      },
    ],
    name: "StakeStart",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "data0",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "memberAddr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "entryId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "referrerAddr",
        type: "address",
      },
    ],
    name: "XfLobbyEnter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "data0",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "memberAddr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "entryId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "referrerAddr",
        type: "address",
      },
    ],
    name: "XfLobbyExit",
    type: "event",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    constant: true,
    inputs: [],
    name: "allocatedSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "rawSatoshis", type: "uint256" },
      { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
      { internalType: "address", name: "claimToAddr", type: "address" },
      { internalType: "bytes32", name: "pubKeyX", type: "bytes32" },
      { internalType: "bytes32", name: "pubKeyY", type: "bytes32" },
      { internalType: "uint8", name: "claimFlags", type: "uint8" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
      { internalType: "uint256", name: "autoStakeDays", type: "uint256" },
      { internalType: "address", name: "referrerAddr", type: "address" },
    ],
    name: "btcAddressClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "bytes20", name: "", type: "bytes20" }],
    name: "btcAddressClaims",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "bytes20", name: "btcAddr", type: "bytes20" },
      { internalType: "uint256", name: "rawSatoshis", type: "uint256" },
      { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
    ],
    name: "btcAddressIsClaimable",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "bytes20", name: "btcAddr", type: "bytes20" },
      { internalType: "uint256", name: "rawSatoshis", type: "uint256" },
      { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
    ],
    name: "btcAddressIsValid",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "claimToAddr", type: "address" },
      { internalType: "bytes32", name: "claimParamHash", type: "bytes32" },
      { internalType: "bytes32", name: "pubKeyX", type: "bytes32" },
      { internalType: "bytes32", name: "pubKeyY", type: "bytes32" },
      { internalType: "uint8", name: "claimFlags", type: "uint8" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "claimMessageMatchesSignature",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "currentDay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "dailyData",
    outputs: [
      { internalType: "uint72", name: "dayPayoutTotal", type: "uint72" },
      { internalType: "uint72", name: "dayStakeSharesTotal", type: "uint72" },
      {
        internalType: "uint56",
        name: "dayUnclaimedSatoshisTotal",
        type: "uint56",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint256", name: "beginDay", type: "uint256" },
      { internalType: "uint256", name: "endDay", type: "uint256" },
    ],
    name: "dailyDataRange",
    outputs: [{ internalType: "uint256[]", name: "list", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "beforeDay", type: "uint256" }],
    name: "dailyDataUpdate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "globalInfo",
    outputs: [{ internalType: "uint256[13]", name: "", type: "uint256[13]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "globals",
    outputs: [
      { internalType: "uint72", name: "lockedHeartsTotal", type: "uint72" },
      { internalType: "uint72", name: "nextStakeSharesTotal", type: "uint72" },
      { internalType: "uint40", name: "shareRate", type: "uint40" },
      { internalType: "uint72", name: "stakePenaltyTotal", type: "uint72" },
      { internalType: "uint16", name: "dailyDataCount", type: "uint16" },
      { internalType: "uint72", name: "stakeSharesTotal", type: "uint72" },
      { internalType: "uint40", name: "latestStakeId", type: "uint40" },
      { internalType: "uint128", name: "claimStats", type: "uint128" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "bytes32", name: "pubKeyX", type: "bytes32" },
      { internalType: "bytes32", name: "pubKeyY", type: "bytes32" },
    ],
    name: "pubKeyToEthAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "stakerAddr", type: "address" }],
    name: "stakeCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "stakeIndex", type: "uint256" },
      { internalType: "uint40", name: "stakeIdParam", type: "uint40" },
    ],
    name: "stakeEnd",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "stakerAddr", type: "address" },
      { internalType: "uint256", name: "stakeIndex", type: "uint256" },
      { internalType: "uint40", name: "stakeIdParam", type: "uint40" },
    ],
    name: "stakeGoodAccounting",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "stakeLists",
    outputs: [
      { internalType: "uint40", name: "stakeId", type: "uint40" },
      { internalType: "uint72", name: "stakedHearts", type: "uint72" },
      { internalType: "uint72", name: "stakeShares", type: "uint72" },
      { internalType: "uint16", name: "lockedDay", type: "uint16" },
      { internalType: "uint16", name: "stakedDays", type: "uint16" },
      { internalType: "uint16", name: "unlockedDay", type: "uint16" },
      { internalType: "bool", name: "isAutoStake", type: "bool" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "newStakedHearts", type: "uint256" },
      { internalType: "uint256", name: "newStakedDays", type: "uint256" },
    ],
    name: "stakeStart",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "xfLobbyMembers",
    outputs: [
      { internalType: "uint40", name: "headIndex", type: "uint40" },
      { internalType: "uint40", name: "tailIndex", type: "uint40" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
var contractAddress = "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39";

const fetch = async (_txHash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.provider);
      const txReceipt = await provider.waitForTransaction(_txHash);
      const Web3Client = new Web3(
        new Web3.providers.HttpProvider(config.provider)
      );
      const contract = new Web3Client.eth.Contract(abi, contractAddress);
      // var balanceOf = await contract.methods.balanceOf(_txHash).call();
      // console.log("balanceOf", balanceOf);
      var stakeCount = await contract.methods.stakeCount(txReceipt.from).call();
      console.log(stakeCount);
      for (var stakeIndex = 0; stakeIndex < stakeCount; stakeIndex++) {
        let stake = await contract.methods
          .stakeLists(txReceipt.from, stakeIndex)
          .call();
        console.log(stake);
      }
      console.log("stakeCount", stakeCount);
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
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  fetch: fetch,
};
