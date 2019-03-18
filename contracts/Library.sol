pragma solidity >=0.4.0 <0.6.0;

library Library {
  struct DNSName {
     bytes32 name;
     address payable owner;
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