// backend/routes/nftRoutes.js
const express = require("express");
const router = express.Router();
const fetch = require('node-fetch'); // Import node-fetch for making web requests
const nftContract = require("../utils/web3"); // Assuming this correctly imports your initialized contract

// This route will now handle requests for product details by NFT ID
// The frontend will call /api/product/:id (assuming app.js uses app.use('/api', nftRoutes))
router.get("/product/:id", async (req, res) => { // Changed route path to /product/:id
  if (!nftContract) {
    console.error("NFT Contract not initialized. Check backend/utils/web3.js");
    return res.status(500).json({ error: "Blockchain contract not ready." });
  }

  try {
    const tokenId = req.params.id; // Get the NFT ID from the URL

    // 1. Call the smart contract to get the tokenURI for this NFT ID
    const tokenUri = await nftContract.tokenURI(tokenId);

    if (!tokenUri) {
      console.warn(`No tokenURI found for tokenId: ${tokenId}`);
      return res.status(404).json({ error: `Product with NFT ID ${tokenId} not found on blockchain.` });
    }

    // 2. Fetch the actual NFT metadata from the tokenURI
    // This is where your backend acts as a "proxy" to get the full details
    const metadataResponse = await fetch(tokenUri);

    if (!metadataResponse.ok) {
      const errorBody = await metadataResponse.text();
      console.error(`Failed to fetch metadata from URI: ${tokenUri}. Status: ${metadataResponse.status}. Body: ${errorBody}`);
      throw new Error(`Could not retrieve metadata from ${tokenUri}.`);
    }

    const nftMetadata = await metadataResponse.json();

    // 3. Validate the fetched metadata to ensure it matches your frontend's ProductDetail component
    // Your ProductDetail component expects these specific fields.
    if (
      !nftMetadata.name || 
      !nftMetadata.nftId || // Ensure the NFT ID is part of the metadata
      !nftMetadata.freshnessScore || 
      !Array.isArray(nftMetadata.timeline) || nftMetadata.timeline.length === 0
    ) {
      console.error("Incomplete or invalid NFT metadata structure:", nftMetadata);
      return res.status(500).json({ error: "Received incomplete or malformed product data from metadata URI." });
    }

    // 4. Send the full, validated metadata to the frontend
    res.json(nftMetadata);

  } catch (err) {
    console.error("Error in /api/product/:id route:", err);
    res.status(500).json({ error: err.message || "An unknown error occurred while fetching product details." });
  }
});

module.exports = router;