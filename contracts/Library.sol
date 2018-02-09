pragma solidity ^0.4.18;
library Library {
  struct DNSName {
     bytes32 name;
     address owner;
     uint price;
     bool exists;
   }

    enum BidStates {
        NULL,
        OPEN,
        ACCEPTED,
        OVERBIDDEN,
        WITHDRAWN
    }

    enum BidContainerState {
        NULL,
        ACTIVE,
        INACTIVE
    }   
}