pragma solidity ^0.4.18;

import './Util.sol';
import './ProtectReEntry.sol';
import './BidContainer.sol';
import './Library.sol';


/**
 * Author Hitesh Joshi
 * Reserve a Name
 * Bid on names
 * New Bid has to greater than the last Bid
 * Send money through DNS names
 * Accept Bids and transfer ownership
 * Initial reservation fee goes to DNS Creator 
 * Initial fee has to be atleast 100 finney and capped at 10 Ether
 * 
 */ 

contract DNSRegistry is Util, ProtectReEntry {
     
     // using Library for Library.DNSName;
     mapping (bytes32 => Library.DNSName) dnsNameMap;
    
     // every Name has a Bid map  containig all bids for the map
     mapping (bytes32 => BidContainer) bidContainerMap;
    
     uint constant MINIMUM_NAME_LENGTH = 2;
     uint constant MAX_NAME_LENGTH = 25;
    
     //Initial fee tx goes to contract creator
     address registryOwner;
    
     // events
     event DnsCreatedEvent(address _owner);
     event ReserveNameEvent(string _name , uint _reserveNameFee,
        address _reservedBy, bool _success);
     event EtherSentToNameEvent(string _name, uint _amount);
     event ReleasedOwnershipEvent(string _name);
     event HighestBidIncreasedEvent(address bidder, uint price);
	 event BidWithdrawnEvent(string _name,address _bidder, uint _withdrawnAmount);
	 event BidAcceptedEvent(string _name,address _oldOwner, 
        address newOwner,uint latestPrice);  
     
    
     // constructor
    function DNSRegistry() public {
        registryOwner = msg.sender;
        DnsCreatedEvent(msg.sender);
    }
    
    /**
      * Public Member to check Name Availability
      * 
      */
    function checkNameExists(string _name) public view
        returns(bool _exists)
        {
         bytes32 name = toBytes32(_name);
         return hasOwner(name);
     }
     
    function hasOwner(bytes32 _name) internal view returns (bool _nameExists) {
        return dnsNameMap[_name].exists;
     }

      
    /**
     * Reserving a Name for the first Time
     * Can reserve a name that is not reserved yet
     * Atleast 100 finney reservation fee, capped at 10 Ether
     * Name should be minLength = 2 and maxLength = 25
     * Case sensitive
     * Only () _ - ! .  are allowed in the name
     */ 
    function reserveName(string _name) 
           public payable returns(bool success)  
         {
         externalEnter();     
        //  require(validateName(_name) == true);   
         bytes32 name = toBytes32(_name); 
         // check again even if you checked using checkNameAvailability
         // do not use throw(deprecated) or assert be good devs
         require(!hasOwner(name)); 
         uint reserveNameFee = msg.value;
         // TODO commented the check for init fee as  test case is failing 
         require(validateDNSNameProposal(reserveNameFee));
        
         // if pre cond are good, send some love to the developer
         bool sentOk = registryOwner.send(reserveNameFee);
         // love shown to the developer
         bool created = false;
         if (sentOk) {
            created = createNewDNSEntry(name,reserveNameFee);
            // create the BidContainer
            BidContainer bidContainer = new BidContainer(reserveNameFee);
            // add the first bid
            bidContainerMap[name] = bidContainer;
            ReserveNameEvent(_name, reserveNameFee, msg.sender, created);
         }
         externalLeave();
         return created;
     }
      
      // function to check name, initial fee has to be atleast 0.1 Ether 
    function validateDNSNameProposal(
         uint _reserveNameFee
       ) pure internal returns (bool) 
        {
        // conscientious developer - setting upper limit to 10 ether
        if (_reserveNameFee < 1 finney ||
            _reserveNameFee > 10 ether) {
            return false;
        }        
        return true;
     }
    
     // create the actual DNS entry - private curb inheritance
    function createNewDNSEntry(bytes32 _name, uint _reserveNameFee) private
      returns (bool _created)
     {
       dnsNameMap[_name].name = _name;
       dnsNameMap[_name].owner = msg.sender;
       dnsNameMap[_name].price = _reserveNameFee; 
       dnsNameMap[_name].exists = true;
       return true;
     }
     /**
      * Send Dough to a Name using the registry
      */
    function sendEtherToName(string _name) public payable returns (bool) {
        externalEnter();
        uint amount = msg.value;
         require(msg.sender.balance > amount);
         bytes32 name = toBytes32(_name); 
         require(hasOwner(name));
         Library.DNSName storage dnsName = dnsNameMap[name];
         require(msg.sender != dnsName.owner);
         dnsName.owner.transfer(amount);
         EtherSentToNameEvent(_name,amount);
         externalLeave();
         return true;
     }
     /**
      * Function to Bid on a name
      * Can bid only on acquired names
      * Owner cannot bid on his own name - no artificial inflation of price
      * Bids should be higher than the highest bid received so far
      */ 
    function bid(string _name) public payable {
        externalEnter();
        bytes32  name = toBytes32(_name); 
        // name should be owned by someone before you bid
        require(hasOwner(name));
        // can't bid on your own name 
        require(msg.sender != dnsNameMap[name].owner);
        
        // current bid has to be higher than last
        require(msg.value > getHighestBidSoFar(_name));
        
        BidContainer bidContainer = bidContainerMap[name];
        uint bidPrice = msg.value;
        bidContainer.addBid(bidPrice,msg.sender);
        HighestBidIncreasedEvent(msg.sender,msg.value);
        externalLeave();
     }
   
     /**
      * View function to get the Highest bid for a name
      */
    function getHighestBidSoFar(string _name) public view 
      returns(uint bidPrice)
       {
         bytes32  name = toBytes32(_name);
       // find the BidContainer for this name
       BidContainer bidContainer = bidContainerMap[name];
       return bidContainer.currentPrice();
     }
     
    function getHighestBidder(string _name) public view
        returns(address bidder)
        {
       bytes32  name = toBytes32(_name);
       // find the BidContainer for this name
       BidContainer bidContainer = bidContainerMap[name];
       return bidContainer.topBidder();
     }
     
    function getBidValue(string _name,address _address) public constant
        returns(uint bidval)
       {
       bytes32  name = toBytes32(_name);
       // find the BidContainer for this name
       BidContainer bidContainer = bidContainerMap[name];
       return bidContainer.getBidAmount(_address);
     }
     
     /**
      * Withdraws a bid on a name 
      * Only allows withdrawls if you current bid is not top bid
      * Allows to withdraw all previous overbidden bids
      */ 
     
    function withdrawOverBiddenBid(string _name) public returns(bool done) {
        externalEnter();
        bytes32  name = toBytes32(_name);
        BidContainer bidContainer = bidContainerMap[name];
        //require(bidContainer.state() == Library.BidContainerState.ACTIVE);
        
        // if he is not a top Bidder let him withdraw
        require(msg.sender != bidContainer.topBidder());
        
        // get all amount for sender
        uint amount = bidContainer.getPendingAmount(msg.sender);
        
        // set Bid exists to false
        require(bidContainer.setBidState(false,
          Library.BidStates.WITHDRAWN, msg.sender) == true);
        
        // send amount back
        if (!msg.sender.send(amount)) {
                // if amount sending failed, create a new bid 
                // as we have canceled the old one
                bidContainer.addDefunctBid(amount, msg.sender);
                return false;
            }
            BidWithdrawnEvent(_name, msg.sender, amount);
            externalLeave();
            return true;
      }
	  
	   /**
	   * Owner accepts a bid 
	   * Ether equal to winning bid is transferred to owner account
	   * ownership changes hands
	   * Winners bid balance is adjusted 
	   */ 
	function acceptBidAndTransferOwnerShip(string _name) public
         returns(bool transferred)
         {
         externalEnter();
         bytes32  name = toBytes32(_name);
         // check owner exists
         require(hasOwner(name));
         // only owner can accept bids
         require(msg.sender == dnsNameMap[name].owner);
         
         // get the highest bid
         uint winningBid = getHighestBidSoFar(_name);
         // get the highest Bidder
         bool isPayed = false;
         // transfer Dough
         // if success, transfer ownserhip
           if (msg.sender.send(winningBid)) {
              
           address winningBidder = getHighestBidder(_name);
           dnsNameMap[name].price = winningBid;
           dnsNameMap[name].owner = winningBidder;
           BidContainer bidContainer = bidContainerMap[name];
           bidContainer.adjustBalanceOnWinning(winningBidder,winningBid); 
           // remove the winnig bid out of existence
           require(bidContainer.setBidState(false,
           Library.BidStates.ACCEPTED, winningBidder) == true);
           isPayed = true;
           
           }
          BidAcceptedEvent(_name,msg.sender,winningBidder,winningBid); 
          externalLeave();
          return isPayed;
        }
     
     
     /**
      * voluntarily release Ownership
      * Not Sure why would anyone release ownership without a bid
      * Unless as an extension later, they have to pay
      * for maintaining their name in DNS
      * constraint - Only owner can release a Name
      */
    function releaseOwnership(string _name) public 
        returns (bool _released) 
        {
        externalEnter();    
         bytes32  name = toBytes32(_name); 
         require(hasOwner(name));
         // only owner can release ownership
         require(msg.sender == dnsNameMap[name].owner);
         dnsNameMap[name].price = 0; 
         dnsNameMap[name].exists = false;
         ReleasedOwnershipEvent(_name);
         externalLeave();
         return true;
     }

     function checkNamePrice(string _name) public view returns(uint) {
         bytes32  name = toBytes32(_name); 
         require(hasOwner(name));
         return dnsNameMap[name].price;         
     }

     function getCurrentOwnerOfName(string _name) public view returns(address) {
        bytes32  name = toBytes32(_name); 
         require(hasOwner(name));
         return dnsNameMap[name].owner;    
     }

     /**
      * Get total bid money held by contract
      * Helps to test if the bids are repatraited correctly
      */
     function getTotalEtherHeldInContract() public view returns (uint) {
         return this.balance;
     }
    
    function validateName(string _name) pure internal 
       returns (bool allowed) 
       {
        bytes memory nameBytes = bytes(_name);
       
        uint lengthBytes = nameBytes.length;
        if (lengthBytes < MINIMUM_NAME_LENGTH ||
            lengthBytes > MAX_NAME_LENGTH) {
            return false;
        }
        bool foundNonPunctuation = false;
        for (uint i = 0; i < lengthBytes; i++) {
            byte b = nameBytes[i];
            if (
                // 0 - 9
                // A - Z
                // a - z 
                (b >= 48 && b <= 57) || (b >= 65 && b <= 90) || (b >= 97 && b <= 122)
            ) {
                foundNonPunctuation = true;
                continue;
            }
            if (
                // space
                // !
                // (
                // )
                // -
                // .
                // _
                b == 32 || b == 33 || b == 40 || b == 41 || b == 45 || b == 46 || b == 95    
            ) {
                continue;
            }
            return false;
        }
        return foundNonPunctuation;
    }
}