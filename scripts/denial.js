const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0x624dC0EcEFD94640D316eE3ACfD147Ed9B764638"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/DenialAttack.sol/DenialAttack.json').toString())

attackerFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    deployOptions = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    attackerContract = await attackerFactory.deploy(deployOptions)
    await attackerContract.deployTransaction.wait()
    console.log(attackerContract.address)
})();