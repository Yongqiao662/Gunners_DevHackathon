const express = require("express");
const router = express.Router();
const nftContract = require("../utils/web3");

router.get("/:id", async (req, res) => {
  if (!nftContract) {
    return res.status(500).json({ error: "Contract not ready. ABI missing?" });
  }

  try {
    const tokenId = req.params.id;
    const uri = await nftContract.tokenURI(tokenId);
    res.json({ tokenId, uri });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

