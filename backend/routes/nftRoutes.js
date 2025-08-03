const express = require('express');
const router = express.Router();

// POST /api/nft/mint
router.post('/mint', (req, res) => {
  const { toAddress, tokenURI } = req.body;
  res.json({
    message: `Simulated minting NFT for ${toAddress}`,
    tokenURI,
    success: true,
  });
});

// GET /api/nft/product/:id
router.get('/product/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    productId: id,
    freshnessScore: 95,
    status: "Safe",
  });
});

module.exports = router;
