// backend/scripts/mint.js
const { ethers } = require("hardhat");

async function main() {
  // Get the signer (the first account from your Hardhat node)
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  // --- IMPORTANT: Replace 'YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE' with your actual deployed address ---
  // This is the address you copied from the 'deploy.js' script output (e.g., 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0)
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // <--- PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE

  // Get the ContractFactory to access the ABI (interface) of your contract
  const FreshChainNFTFactory = await ethers.getContractFactory("FreshChainNFT");

  // Create the contract instance directly using the address, ABI, and signer
  // This explicitly tells ethers.js to treat contractAddress as a literal address.
  const nftContract = new ethers.Contract(contractAddress, FreshChainNFTFactory.interface, deployer);

  // --- Define your NFT Metadata URI ---
  // This URL should point to a JSON file containing the product details.
  // For testing, use the URL from your Python local server (e.g., http://localhost:8000/product_metadata_1.json)
  const tokenURI = "http://localhost:8000/product_metadata_1.json"; 

  // --- Define Product Details for Minting ---
  const productName = "Organic Avocados Batch A";
  const origin = "California, USA";
  const initialLocation = "Farm Warehouse";

  console.log(`Minting NFT for "${productName}"...`);

  // Call the createProductBatch function on your contract
  const tx = await nftContract.createProductBatch(
    productName,
    origin,
    initialLocation,
    tokenURI
  );

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  
  // Extract the tokenId from the 'ProductCreated' event
  // Note: Event parsing can be complex. This is a common pattern for Hardhat.
  const productCreatedEvent = receipt.logs.find(log => 
    nftContract.interface.parseLog(log)?.name === 'ProductCreated'
  );
  
  const mintedTokenId = productCreatedEvent ? productCreatedEvent.args.tokenId.toString() : 'N/A';

  console.log(`NFT minted successfully! Token ID: ${mintedTokenId}`);
  console.log(`Transaction Hash: ${tx.hash}`);
  console.log(`Token URI set to: ${tokenURI}`);
  console.log(`Check transaction on Hardhat Network: http://localhost:8545/tx/${tx.hash}`); // Example for local explorer
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });