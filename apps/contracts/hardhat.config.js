// require("@nomicfoundation/hardhat-toolbox";
require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

const dotenv = require('dotenv');

dotenv.config()
const mnemonic = process.env.PRIVATEKEY;

module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      initialBaseFeePerGas: 0,
      forking: {
        url: `https://arb1.arbitrum.io/rpc`
      }
    },
    hardhat: {
      initialBaseFeePerGas: 0,
      forking: {
        url: `https://arb1.arbitrum.io/rpc`
      }
    },
    arbitrumMainnet: {
      url: `https://arb1.arbitrum.io/rpc`,
      accounts: [`${mnemonic}`],
      chainId: 42161
    },
    arbitrumSepolia: {
      url: `https://arbitrum-sepolia.blockpi.network/v1/rpc/public`,
      accounts: [`${mnemonic}`],
      chainId: 421614,
    },
  },
  etherscan: {
    apiKey: `${process.env.ARBI_API_KEY}`,
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia-explorer.arbitrum.io"
        }
      }
    ]
  },
  solidity: {
    compilers: [
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ]
  }
};
