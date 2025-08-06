const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Ensure node-fetch is imported
const nftContract = require('../utils/web3'); // Your initialized contract instance

// Route to get basic product metadata (already working, fetches from tokenURI)
router.get('/product/:id', async (req, res) => {
  const tokenId = req.params.id;
  if (!nftContract) {
    return res.status(500).json({ error: "NFT contract not initialized. Check backend logs." });
  }

  try {
    // 1. Get tokenURI from the smart contract
    const tokenUri = await nftContract.tokenURI(tokenId);
    
    if (!tokenUri) {
      return res.status(404).json({ error: `Token URI not found for NFT ID: ${tokenId}` });
    }

    // 2. Fetch metadata from the tokenURI (which is now an IPFS Gateway URL)
    const metadataResponse = await fetch(tokenUri);
    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch metadata from ${tokenUri}: ${metadataResponse.statusText}`);
    }
    const metadata = await metadataResponse.json();

    res.json(metadata);
  } catch (err) {
    console.error(`Error in /api/product/:id route for tokenId ${tokenId}:`, err);
    res.status(500).json({ error: "An unknown error occurred while fetching product details.", details: err.message });
  }
});

// NEW ROUTE: Get full product batch details from the smart contract
router.get('/product/:id/details', async (req, res) => {
  const tokenId = req.params.id;
  if (!nftContract) {
    return res.status(500).json({ error: "NFT contract not initialized. Check backend logs." });
  }

  try {
    // Call the getProductDetails view function on your smart contract
    // The contract returns a struct, which ethers.js maps to an object
    const productBatch = await nftContract.getProductDetails(tokenId);

    // Check if the product exists (e.g., if productName is empty or a default value)
    // You might need to refine this check based on your contract's default struct values
    if (!productBatch || productBatch.productName === "") { // Assuming productName is a good indicator
      return res.status(404).json({ error: `Product batch details not found for NFT ID: ${tokenId}` });
    }

    // Convert BigNumber/BigInt values to strings for JSON serialization
    const formattedProductBatch = {
      productName: productBatch.productName,
      origin: productBatch.origin,
      harvestDate: productBatch.harvestDate.toString(), // Convert BigInt to string
      freshnessScore: productBatch.freshnessScore.toString(), // Convert BigInt to string
      currentLocation: productBatch.currentLocation,
      currentHandler: productBatch.currentHandler,
      isActive: productBatch.isActive,
    };

    res.json(formattedProductBatch);
  } catch (err) {
    console.error(`Error in /api/product/:id/details route for tokenId ${tokenId}:`, err);
    res.status(500).json({ error: "An unknown error occurred while fetching product batch details.", details: err.message });
  }
});

// NEW ROUTE: Get sensor history for a product from the smart contract
router.get('/product/:id/history', async (req, res) => {
  const tokenId = req.params.id;
  if (!nftContract) {
    return res.status(500).json({ error: "NFT contract not initialized. Check backend logs." });
  }

  try {
    // Call the getSensorHistory view function on your smart contract
    // This returns an array of SensorReading structs
    const sensorHistory = await nftContract.getSensorHistory(tokenId);

    if (!sensorHistory || sensorHistory.length === 0) {
      return res.status(404).json({ error: `Sensor history not found for NFT ID: ${tokenId}` });
    }

    // Format the sensor history to convert BigNumber/BigInt to strings
    const formattedSensorHistory = sensorHistory.map(reading => ({
      timestamp: reading.timestamp.toString(), // Convert BigInt to string
      temperature: reading.temperature.toString(), // Convert BigInt to string
      humidity: reading.humidity.toString(), // Convert BigInt to string
      location: reading.location,
    }));

    res.json(formattedSensorHistory);
  } catch (err) {
    console.error(`Error in /api/product/:id/history route for tokenId ${tokenId}:`, err);
    res.status(500).json({ error: "An unknown error occurred while fetching sensor history.", details: err.message });
  }
});

module.exports = router;