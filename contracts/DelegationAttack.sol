pragma solidity ^0.8.0;

contract DelegationAttack {
    address delegationAddress;

    constructor(address delegationAddress) public {
        delegationAddress = delegationAddress;
    }

    function sendTx() public returns(bytes32){
        // bytes memory data = abi.encodeWithSignature("pwn()");
        bytes32 data = bytes32(keccak256("pwn()"));
        return data;
    }
}