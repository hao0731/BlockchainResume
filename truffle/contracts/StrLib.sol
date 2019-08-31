pragma solidity ^0.5.0;

library StrLib {
    function compare(string memory str1, string memory str2) public pure returns(bool) {
        bytes memory str1_bytes = bytes(str1);
        bytes memory str2_bytes = bytes(str2);
        return keccak256(str1_bytes) == keccak256(str2_bytes);
    }
}