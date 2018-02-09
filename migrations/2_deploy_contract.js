var DNSRegistry = artifacts.require("DNSRegistry");

module.exports = function(deployer) {
  deployer.deploy(DNSRegistry);
};