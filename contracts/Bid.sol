pragma solidity ^0.4.18;

import './Library.sol';


contract Bid {
    
 using Library for Library.BidStates;
  uint public amount;
  Library.BidStates public state;
  bool public exists;
  address public owner ;

  function Bid(uint _amount, address _owner) public {
    amount = _amount;
    owner = _owner;
    state = Library.BidStates.OPEN;
    exists = true;
  }
  
  
  function setBidExists(bool _exists) public {
    exists = _exists;
  }

  function getState() public constant returns (Library.BidStates) {
    return state;
  }

  function setState(Library.BidStates _state) public {
    state = _state;
  }
}
