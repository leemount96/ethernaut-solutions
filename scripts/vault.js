const { ethers } =  require("ethers"); 
const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0x40a87c555319e8bD334b209CA3fA22615b9c619e"

;(async () => {
    val = await provider.getStorageAt(contract_address, 1)
    console.log(val)
})();