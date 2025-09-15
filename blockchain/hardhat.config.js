require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ADMIN_PRIVATE_KEY, BLOCKCHAIN_RPC_URL } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: BLOCKCHAIN_RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: [ADMIN_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001"], // Default private key for safety
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
