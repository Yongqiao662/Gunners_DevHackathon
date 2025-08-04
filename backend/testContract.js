const nftContract = require("./utils/web3");

async function test() {
  // If the ABI is not loaded or contract not ready
  if (!nftContract) {
    console.log("⛔ NFT contract is not ready. ABI may be missing.");
    return;
  }

  try {
    const tokenId = 1;

    // Call the tokenURI function from the contract
    const uri = await nftContract.tokenURI(tokenId);

    console.log(`✅ Token URI for token ID ${tokenId}: ${uri}`);
  } catch (error) {
    console.error("❌ Error calling tokenURI:", error.message);
  }
}

test();
