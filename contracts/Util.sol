pragma solidity ^0.5.0;

contract Util {
  function stringToBytes32(string memory source) internal pure 
    returns (bytes32 result)
    {
      // convert to byte array to get length
    bytes memory tempEmptyStringTest = bytes(source);
    if(tempEmptyStringTest.length == 0) {
        return 0x0;
    }
      assembly {
          result := mload(add(source, 32))
      }
      return result;
    }
  
  // convert string to Bytes32  
  function toBytes32(string memory source) public pure returns (bytes32) {
    return stringToBytes32(source);
  }
  
}  