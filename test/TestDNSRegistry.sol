pragma solidity >=0.4.0 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DNSRegistry.sol";

contract TestDNSRegistry {
    
  DNSRegistry registry = DNSRegistry(DeployedAddresses.DNSRegistry());
  uint public initialBalance = .50 ether;
  uint public MIN_RESERVATION_FEE = 0.11 ether;
    
    /**
     * Not sure how to write tests tbut use different accounts as msg.sender 
     * that invoke other public contract methods
     * https://github.com/trufflesuite/truffle/issues/644
     */
    
    // testing all function which can have common msg.sender 
      function testcheckNameExists() public {
        bool nameExists = registry.checkNameExists("hj");
        Assert.equal(nameExists, false, "Name is not reserved yet");
     }

      function testReserveName() public {    
            bool reserved = registry.reserveName.value(MIN_RESERVATION_FEE)("hj");      
            Assert.equal(reserved, true, "Name is reserved.");
            bool nameExists = registry.checkNameExists("hj");
            Assert.equal(nameExists, true, "Name is reserved now");
    }

    function testReleaseOwnership() public {
        Assert.equal(registry.checkNameExists("hj"), true, "Name is reserved now");
        bool release = registry.releaseOwnership("hj");
        Assert.equal(release, true, "Name is released now");
        Assert.equal(registry.checkNameExists("hj"), false, "Name is not reserved now");
    }

}