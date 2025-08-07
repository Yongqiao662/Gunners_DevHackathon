const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Ensure node-fetch is imported
const nftContract = require('../utils/web3'); // Your initialized contract instance

// --- EXISTING ROUTES ---

// Route to get basic product metadata (already working, fetches from tokenURI)
router.get('/product/:id', async (req, res) => {
  const tokenId = req.params.id;
  if (!nftContract) {
    return res.status(500).json({ error: "NFT contract not initialized. Check backend logs." });
  }

  try {
    const tokenUri = await nftContract.tokenURI(tokenId);
    
    if (!tokenUri) {
      return res.status(404).json({ error: `Token URI not found for NFT ID: ${tokenId}` });
    }

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

// Route to get full product batch details from the smart contract
router.get('/product/:id/details', async (req, res) => {
  const tokenId = req.params.id;
  if (!nftContract) {
    return res.status(500).json({ error: "NFT contract not initialized. Check backend logs." });
  }

  try {
    const productBatch = await nftContract.getProductDetails(tokenId);

    if (!productBatch || productBatch.productName === "") {
      return res.status(404).json({ error: `Product batch details not found for NFT ID: ${tokenId}` });
    }

    const formattedProductBatch = {
      productName: productBatch.productName,
      origin: productBatch.origin,
      harvestDate: productBatch.harvestDate.toString(),
      freshnessScore: productBatch.freshnessScore.toString(),
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

// Route to get sensor history for a product from the smart contract
router.get('/product/:id/history', async (req, res) => {
  const tokenId = req.params.id;
  if (!nftContract) {
    return res.status(500).json({ error: "NFT contract not initialized. Check backend logs." });
  }

  try {
    const sensorHistory = await nftContract.getSensorHistory(tokenId);

    if (!sensorHistory || sensorHistory.length === 0) {
      return res.status(404).json({ error: `Sensor history not found for NFT ID: ${tokenId}` });
    }

    const formattedSensorHistory = sensorHistory.map(reading => ({
      timestamp: reading.timestamp.toString(),
      temperature: reading.temperature.toString(),
      humidity: reading.humidity.toString(),
      location: reading.location,
    }));

    res.json(formattedSensorHistory);
  } catch (err) {
    console.error(`Error in /api/product/:id/history route for tokenId ${tokenId}:`, err);
    res.status(500).json({ error: "An unknown error occurred while fetching sensor history.", details: err.message });
  }
});

// --- NEW ROUTE FOR PRODUCT TRANSFER ---
router.post('/transfer', async (req, res) => {
  const { from, to, tokenId } = req.body;

  if (!from || !to || !tokenId) {
    return res.status(400).json({ error: "Missing required parameters: 'from', 'to', or 'tokenId'." });
  }

  if (!nftContract) {
    return res.status(500).json({ error: "NFT contract not initialized. Check backend logs." });
  }

  try {
    // 1. Check current ownership
    const currentOwner = await nftContract.ownerOf(tokenId);
    if (currentOwner.toLowerCase() !== from.toLowerCase()) {
      return res.status(403).json({ error: "Sender is not the current owner of the token." });
    }

    // 2. Execute the safeTransferFrom transaction
    // The `signer` wallet in web3.js will be the one executing this transaction.
    // In a real app, this would be a secure, authorized wallet.
    const tx = await nftContract.safeTransferFrom(from, to, tokenId);

    // 3. Wait for the transaction to be mined and get the receipt
    await tx.wait();

    console.log(`✅ Product transfer successful! NFT ID: ${tokenId} from ${from} to ${to}. Tx Hash: ${tx.hash}`);
    res.json({ success: true, message: "Product transferred successfully.", transactionHash: tx.hash });
  } catch (err) {
    console.error("❌ Error in /api/transfer route:", err);
    res.status(500).json({ error: "Failed to transfer product.", details: err.message });
  }
});

module.exports = router;
