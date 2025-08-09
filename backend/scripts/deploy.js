// backend/scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

 
  const FreshChainNFTContract = await ethers.getContractFactory("FreshChainNFT"); 

  console.log("Deploying FreshChainNFT contract...");

  
  const freshChainNFT = await FreshChainNFTContract.deploy(); 

  
  console.log("FreshChainNFT contract deployed to:", freshChainNFT.target);

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
