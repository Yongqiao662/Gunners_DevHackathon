// backend/scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Get the ContractFactory for your NFT contract
  // "FreshChainNFT" must exactly match the contract name in NFT.sol
  const FreshChainNFTContract = await ethers.getContractFactory("FreshChainNFT"); 

  console.log("Deploying FreshChainNFT contract...");

  // Deploy the contract
  // The .deploy() method now returns a promise that resolves after deployment
  const freshChainNFT = await FreshChainNFTContract.deploy(); 

  // In Ethers v6, the deployed contract's address is typically accessed via .target
  console.log("FreshChainNFT contract deployed to:", freshChainNFT.target);

  // IMPORTANT: Copy this address (freshChainNFT.target)! You'll need it for backend/utils/web3.js
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
