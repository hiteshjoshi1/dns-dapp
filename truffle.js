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
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777", // Match any network id
      chainId: "5777",
      from: "0x527Fce59EB5332572cdc98Fc04f3c4fFAA9BCcD2",
      gas: 4600000
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          "local whale gorilla escape history seven foster liar proud carbon quality offer",
          "https://ropsten.infura.io/v3/" + process.env.API_KEY,
          1,
          4
        );
      },
      network_id: 3,
      from: "0xDE4dB6938e4e54717FeCC48025Cc718bA28A4C99"
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          "local whale gorilla escape history seven foster liar proud carbon quality offer",
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
          "local whale gorilla escape history seven foster liar proud carbon quality offer",
          "https://rinkeby.infura.io/v3/" + process.env.API_KEY
        );
      },
      network_id: 4,
      from: "0xDE4dB6938e4e54717FeCC48025Cc718bA28A4C99"
    }
  }
};
