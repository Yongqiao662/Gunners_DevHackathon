// backend/utils/web3.js
const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // Ensure dotenv is loaded to access process.env variables

let contractABI;
let contractBytecode; // Not strictly needed for contract instance, but useful for deployment

// --- IMPORTANT: Load ABI from Hardhat artifacts ---
// Hardhat compiles your contracts and places their artifacts (including ABI)
// in the 'artifacts' directory.
const contractArtifactPath = path.resolve(
  __dirname,
  "../artifacts/contracts/NFT.sol/FreshChainNFT.json" // Correct path to your compiled contract's artifact
);

try {
  const artifact = JSON.parse(fs.readFileSync(contractArtifactPath, "utf8"));
  contractABI = artifact.abi;
  contractBytecode = artifact.bytecode; // Optional: if you ever need bytecode
  console.log("✅ FreshChainNFT ABI loaded successfully from Hardhat artifacts.");
} catch (e) {
  console.error(
    "❌ Error loading FreshChainNFT ABI from artifacts. Make sure your contract is compiled."
  );
  console.error(
    "Expected path:",
    contractArtifactPath,
    "\nError:",
    e.message
  );
  contractABI = []; // Set to empty array if not found to prevent errors
}

// --- Environment Variables ---
// Ensure these are correctly set in your backend/.env file
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Only needed if your backend sends transactions

// --- Provider and Signer Setup ---
// The provider connects to the blockchain node (your Hardhat local node)
const provider = new ethers.JsonRpcProvider(RPC_URL);

// The signer is used for sending transactions (e.g., minting, updating data)
// If PRIVATE_KEY is not provided, the contract instance will be read-only.
const signer = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, provider) : null;

// --- Contract Instance ---
let nftContract = null;
if (contractABI.length > 0 && CONTRACT_ADDRESS) {
  try {
    // Initialize the contract instance. Use signer if available, otherwise just provider for read-only.
    nftContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer || provider);
    console.log("✅ FreshChainNFT contract instance created.");
    console.log("   Contract Address:", CONTRACT_ADDRESS);
    console.log("   RPC URL:", RPC_URL);
  } catch (e) {
    console.error("❌ Error creating FreshChainNFT contract instance:", e.message);
    nftContract = null; // Ensure it's null if creation fails
  }
} else {
  console.warn(
    "⚠️ FreshChainNFT contract instance not created. Check if ABI is loaded and CONTRACT_ADDRESS is set in .env"
  );
  if (!contractABI.length) console.warn("   - ABI is empty.");
  if (!CONTRACT_ADDRESS) console.warn("   - CONTRACT_ADDRESS is missing in .env.");
}

module.exports = nftContract;
