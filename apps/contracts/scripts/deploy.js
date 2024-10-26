const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;
const { AddressZero } = ethers.constants;
const { getAddress, solidityKeccak256 } = require("ethers/lib/utils")

const sleep = async (seconds) => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

const deploy = async (contractName, ...args) => {
  const factory = await ethers.getContractFactory(contractName);
  const contract = await factory.deploy(...args);
  await contract.deployed();
  console.log("Deployed", contractName, contract.address);
  await verify(contract, args);
  return contract;
}

const verify = async (contract, args, retry = 3) => {
  if (["hardhat", "localhost"].includes(network.name)) return
  console.log("********************************************************")
  for (let i = 0; i < retry; i++) {
    try {
      await hre.run("verify:verify", {
        address: contract.address,
        constructorArguments: args,
      })
      break
    } catch (ex) {
      console.log("\t* Failed verify", args.join(','), ex.message)
      await sleep(5)
    }
  }
  console.log("********************************************************")
}


async function main() {
  const [deployer, ...addrs] = await ethers.getSigners();

  const baseURI = "https://gateway.pinata.cloud/ipfs/Qmf6R4vyUFQ1qQGwQMg9wL5tHUXP83wf7ipxJXzf7t2ZJf/"

  let nftContract, scrapToken;

  let nftContractAddress = '';
  let scrapTokenAddress = "0x695f6329fa5F5e9f8a4dd9fb9a92Ecf77D441fEe" || "";

  if(nftContractAddress != '') {
    // Getting contract interface if contract already deployed on the chain
    nftContract = await ethers.getContractAt("BattlepassNFT", nftContractAddress)
  } else {
    // Deploying new contract if not
    nftContract = await deploy("BattlepassNFT");
    nftContractAddress = nftContract.address
  }

  console.log('NFT contract:', nftContractAddress)

  if(scrapTokenAddress === '') {
    // Deploying new token
    scrapToken = await deploy("contracts/TestScrapToken.sol:TestScrapToken");
    scrapTokenAddress = scrapToken.address;
  }

  // Please refer to below setting steps
  // try{
  //   // Setting currency token
  //   await nftContract.setCurrencyToken(scrapTokenAddress);

  //   // Starting nft mint
  //   await nftContract.pause(false)

  //   // Setting tiers of NFT
  //   await nftContract.setTier(50, 0)
  //   await nftContract.setTier(20, ethers.utils.parseEther("25"))
  //   await nftContract.setTier(20, ethers.utils.parseEther("50"))
  //   await nftContract.setTier(10, ethers.utils.parseEther("100"))
    
  //   // Setting baseUri
  //   await nftContract.setBaseURI(baseURI)

  // } catch(e) {console.error(e)}

}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });