var DNSRegistry = artifacts.require("DNSRegistry");
const EthereumDIDRegistry = artifacts.require("EthereumDIDRegistry");

module.exports = function(deployer) {
  deployer.deploy(DNSRegistry);
  deployer.deploy(EthereumDIDRegistry);
};
