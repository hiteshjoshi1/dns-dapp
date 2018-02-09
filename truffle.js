module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // This is where you let your truffle connect with your private chain
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0xc69831fee253c0f41b674f0c4c46556cee20b002",
      gas: 4600000 
    }
  }
};
