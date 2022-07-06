const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(18);

contract_address = "0x06B1D212B8da92b83AF328De5eef4E211Da02097"

player_address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

tokenABI = ["function transfer(address _to, uint _value) public returns (bool)"]

tokenContract = new ethers.Contract(contract_address, tokenABI, signer)

;(async () => {
    tx = await tokenContract.transfer(player_address, 200)
    await tx.wait()
})();