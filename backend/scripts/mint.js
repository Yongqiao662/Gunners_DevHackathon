// backend/scripts/mint.js
const { ethers } = require("hardhat");

async function main() {
  // Get the signer (the first account from your Hardhat node)
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  // --- IMPORTANT: Replace 'YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE' with your actual deployed address ---
  // This is the address you copied from the 'deploy.js' script output (e.g., 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0)
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // <--- PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE
  
  // Get the ContractFactory to access the ABI (interface) of your contract
  const FreshChainNFTFactory = await ethers.getContractFactory("FreshChainNFT");
  
  // Create the contract instance directly using the address, ABI, and signer
  const nftContract = new ethers.Contract(contractAddress, FreshChainNFTFactory.interface, deployer);

  // --- Define your NFT Metadata URI and Product Details for Minting ---
  // YOU WILL CHANGE THESE VALUES FOR EACH NFT YOU MINT!

  // Example for Product ID 1:
  //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreib2nmscyioljzckmjhs4gmrvc4gwoibdiuglr2o6fbk2omnn5syf4"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
  //let productName = "Organic Avocados";
  //let origin = "California, USA";
  //let initialLocation = "Avocado Grove";

  

  // Example for Product ID 2 (uncomment and change values to mint a second NFT):
   //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreicxb5idwf7puws2v4nuaea7ssmmkad7372rghrenxcq5ezejpkxzq"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
  // let productName = "Fresh Salmon";
   //let origin = "Norway";
  // let initialLocation = "Norwegian Fjords";

   //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreifuyvz3czw5p4l7azlh6fvwzgbzztuspr7ig4wqrdjup2nreegb2y"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
   //let productName = "Organic Blueberries";
  // let origin = "Mexico";
   //let initialLocation = "Norwegian Fjords";

   //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreibvfqv6pbv3qqqjjje76p3c7q5tuzok3vpe3jr75gcujeoljdooga"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
   //let productName = "Grass-Fed Beef";
   //let origin = "Argentina";
   //let initialLocation = "Norwegian Fjords";

   let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreiah2pgrkhdr5xbkukiwnks5zpx3itm36ncbbwb6ex5jxoopr6upii"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
   let productName = "Organic Almonds";
   let origin = "Spain";
   let initialLocation = "Norwegian Fjords";
  


  console.log(`Minting NFT for "${productName}"...`);

  const tx = await nftContract.createProductBatch(
    productName,
    origin,
    initialLocation,
    tokenURI
  );

  const receipt = await tx.wait();
  
  const productCreatedEvent = receipt.logs.find(log => 
    nftContract.interface.parseLog(log)?.name === 'ProductCreated'
  );
  
  const mintedTokenId = productCreatedEvent ? productCreatedEvent.args.tokenId.toString() : 'N/A';

  console.log(`NFT minted successfully! Token ID: ${mintedTokenId}`);
  console.log(`Transaction Hash: ${tx.hash}`);
  console.log(`Token URI set to: ${tokenURI}`);
  console.log(`Check transaction on Hardhat Network: http://localhost:8545/tx/${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });