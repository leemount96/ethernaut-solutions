const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0xf41B47c54dEFF12f8fE830A411a09D865eBb120E"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/Building.sol/Building.json').toString())

buildingFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    deployOptions = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    buildingContract = await buildingFactory.deploy(contract_address, deployOptions)
    await buildingContract.deployTransaction.wait()

    tx = await buildingContract.goToLastFloor();
    await tx.wait()
})();