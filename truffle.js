require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3();
const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
  plugins: ['truffle-security'],
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // This is where you let your truffle connect with your private chain
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      from: '0x527Fce59EB5332572cdc98Fc04f3c4fFAA9BCcD2',
      gas: 4600000
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          'https://ropsten.infura.io/v3/' + process.env.ROPSTEN_API_KEY,
          1,
          4
        ),
      network_id: 3,
      from: '0x7FaC253bcB2Cd8334572ecde46a8035eAd2105e8'
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          'https://kovan.infura.io/v3/' + process.env.KOVAN_API_KEY,
          1,
          4
        ),
      network_id: 42,
      from: '0x7FaC253bcB2Cd8334572ecde46a8035eAd2105e8'
    }
  }
};
