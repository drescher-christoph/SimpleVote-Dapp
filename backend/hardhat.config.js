require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/fWDv1Aj1d0JpeV5br8qYrk6Tf9c2MTYX",
      accounts: [process.env.PRIVATE_KEY]
    },
    polygonMainnet: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/fWDv1Aj1d0JpeV5br8qYrk6Tf9c2MTYX",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 137
    },
    bscMainnet: {
      url: "https://bnb-mainnet.g.alchemy.com/v2/fWDv1Aj1d0JpeV5br8qYrk6Tf9c2MTYX",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 56
    },
    bscTestnet: {
      url: "https://bnb-testnet.g.alchemy.com/v2/fWDv1Aj1d0JpeV5br8qYrk6Tf9c2MTYX",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97
    },
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
