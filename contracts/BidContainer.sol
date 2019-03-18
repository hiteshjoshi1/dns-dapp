pragma solidity >=0.4.0 <0.6.0;

import './Bid.sol';

contract BidContainer {
    
    using Library for Library.BidStates;
    using Library for Library.BidContainerState;
    // Once the ownership is transferred , container is inactive

    
    // The DNS name holder and the bidders only care about the highest bid
    
   // Initially holds the price paid to reserve
   // then holds highest bid price so far
    uint public currentPrice;
    Library.BidContainerState public state;

    // Allowed withdrawals of previous bids
    mapping(address => Bid) public bidMap;
    // All bids from an address so far are kept here
    mapping (address => uint) public balancesMap;
    // top bidder here
    address payable  public topBidder;
    
    // constructor
      constructor(uint _initPrice) public {
         currentPrice = _initPrice;
         state = Library.BidContainerState.ACTIVE;
    }
    
/**
 * Add a bid 
 * This can be called only if the user is outbidding the highest bid
 * Bidders total balance is tracked
 */
    function addBid(uint _price, address payable _bidder) public returns(bool added) {
        Bid bid = new Bid(_price,_bidder);
        bidMap[_bidder] = bid;
        // add price it to sender balanace
        balancesMap[_bidder] += _price;
        // update the currentPrice
        currentPrice = _price;
        topBidder = _bidder;
        return true;
    }
    /**
     * Function to get the bid amount for a bidder
     * returns the latest most Highest bid only       
     */
    function getBidAmount(address _sender) public view returns(uint amount) {
     Bid bid = bidMap[_sender];
     require(bid.exists());
     return bid.amount();
    }

   /**
    * Function returns all the bids from an address
    */

   function getPendingAmount(address _sender) public view returns(uint amount) {
     return balancesMap[_sender];
    }
    
    /**
     * Balance is reduced as the winning bid goes to Name holder
     */
    function adjustBalanceOnWinning(address _winner, uint _winningBid) public {
        balancesMap[_winner] -= _winningBid;
    }
        
  /**
   * Maintains bid states 
   */
    function setBidState(bool _exists, Library.BidStates _state, address _bidder) 
        public returns(bool bidStateSet)
        {
        Bid bid = bidMap[_bidder];
        require(bid.exists() == true);
        require(bid.owner() == _bidder);
        bid.setState(_state);
        bid.setBidExists(_exists);
        return true;
       }
    /**
     * In case money transfer fails and bid is already removed from system
     * This function adds it back in without changing the topBidder or price
     */
	function addDefunctBid(uint _price, address _bidder) public returns(bool added) {
        Bid bid = new Bid(_price,_bidder);
        bidMap[_bidder] = bid;
        return true;
    }
}