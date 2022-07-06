pragma solidity ^0.8.0;

interface Elevator {
    function goTo(uint _floor) external;
}

contract Building {
    bool public lastFloor;
    Elevator elevator;

    constructor(address elevatorAddress) public{
        lastFloor = true;
        elevator = Elevator(elevatorAddress);
    }

    function isLastFloor(uint) external returns (bool) {
        lastFloor = !lastFloor;
        return lastFloor;
    }

    function goToLastFloor() external {
        elevator.goTo(10);
    }

    function bytes16Convert() public pure returns(bytes16){
        bytes32 input = 0x989920bf4495e53f607d0c623ad20702eacd92cf30f5336c30539fce51aa82d8;
        return bytes16(input);
    }
}