// backend/getTokens.js
const nftContract = require('./utils/web3'); // Import your initialized contract

async function getTokenIds() {
  try {
    // Get the total number of NFTs minted (assuming your contract has a totalSupply function)
    const totalTokens = await nftContract.totalSupply();
    console.log(`Total NFTs minted: ${totalTokens.toString()}`);

    if (totalTokens.eq(0)) { // Use .eq() for BigNumber comparison
      console.log("No NFTs minted yet.");
      return;
    }

    console.log("\nListing all minted Token IDs:");
    for (let i = 0; i < totalTokens; i++) {
      // Assuming your contract has a tokenByIndex function
      // This is common for ERC721Enumerable contracts
      const tokenId = await nftContract.tokenByIndex(i);
      console.log(`Token ID: ${tokenId.toString()}`);

      // You can also fetch the URI for each token
      const tokenUri = await nftContract.tokenURI(tokenId);
      console.log(`  URI: ${tokenUri}`);
    }

  } catch (error) {
    console.error("Error fetching token IDs:", error);
    console.error("Please ensure your contract address, ABI, and RPC URL are correct in backend/utils/web3.js");
    console.error("Also, check if your contract has `totalSupply()` and `tokenByIndex(index)` functions.");
  }
}

getTokenIds();