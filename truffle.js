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
      network_id: "*", // Match any network id
      from: "0x527Fce59EB5332572cdc98Fc04f3c4fFAA9BCcD2",
      gas: 4600000
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          "blade advance bread crouch next steak reduce dress consider labor sail lizard",
          "https://ropsten.infura.io/v3/" + "ed55affe07804359846dd5eebb11c774",
          1,
          4
        ),
      network_id: 3,
      from: "0x7FaC253bcB2Cd8334572ecde46a8035eAd2105e8"
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          "blade advance bread crouch next steak reduce dress consider labor sail lizard",
          "https://kovan.infura.io/v3/" + process.env.API_KEY,
          1,
          4
        ),
      network_id: 42,
      from: "0xc604D6350ecA95EF80a686Dcd36A19ce3d3699f4"
    },
    rinkeby: {
      provider: new HDWalletProvider(
        "blade advance bread crouch next steak reduce dress consider labor sail lizard",
        "https://rinkeby.infura.io/v3/" + "ed55affe07804359846dd5eebb11c774",
        0,
        4
      ),
      network_id: 4
    }
  }
};
