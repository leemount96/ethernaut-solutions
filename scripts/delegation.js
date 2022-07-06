const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0xBA12646CC07ADBe43F8bD25D83FB628D29C8A762"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/DelegationAttack.sol/DelegationAttack.json').toString())

delegationFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    options = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    delegationContract = await delegationFactory.deploy(contract_address, options)
    await delegationContract.deployTransaction.wait()
    tx = await delegationContract.sendTx()
    await tx.wait()
    console.log(tx)
})();