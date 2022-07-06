const { ethers } =  require("ethers"); 

const url = "http://localhost:8545";

// Or if you are running the UI version, use this instead:
// const url = "http://localhost:7545"

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0x61c36a8d610163660E21a8b7359e1Cac0C9133e1"

coinFlipABI = ["function flip(bool _guess) public returns (bool)"]

coinFlipContract = new ethers.Contract(contract_address, coinFlipABI, signer)

const FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

;(async () => {
    consecutiveWins = 0

    blockNumber = await provider.getBlockNumber()
    blockValue = (await provider.getBlock(blockNumber-1)).hash
    coinFlip = Math.floor(blockValue/FACTOR)
    boolVal = false
    if (coinFlip == 1){
        boolVal = true
    }
    console.log(boolVal)
    tx = await coinFlipContract.flip(boolVal)
    await tx.wait()
    console.log(tx)

    consecutiveWins++
    
})();