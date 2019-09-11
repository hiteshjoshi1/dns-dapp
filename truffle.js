require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3();
const HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // This is where you let your truffle connect with your private chain
  networks: {
    development: {
      provider: () => {
        return new Web3.providers.HttpProvider(`http://127.0.0.1:8545`, 100000);
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000
    },
    // development: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "5777", // Match any network id
    //   chainId: "5777",
    //   gas: 4600000
    // },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://ropsten.infura.io/v3/" + process.env.API_KEY,
          0,
          4
        );
      },
      network_id: 3,
      from: "0xDE4dB6938e4e54717FeCC48025Cc718bA28A4C99"
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://kovan.infura.io/v3/" + process.env.API_KEY,
          0,
          4
        );
      },
      network_id: 42,
      from: "0xDE4dB6938e4e54717FeCC48025Cc718bA28A4C99"
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://rinkeby.infura.io/v3/" + process.env.API_KEY,
          0,
          4
        );
      },
      network_id: 4,
      from: "0xDE4dB6938e4e54717FeCC48025Cc718bA28A4C99"
    }
  }
};
