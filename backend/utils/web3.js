const ethers = require("ethers");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

let contractABI;
try {
  contractABI = require("./NFT_ABI.json");
} catch (e) {
  console.warn("⚠️ ABI file not found yet. Please add NFT_ABI.json in /utils.");
  contractABI = [];
}

const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, provider) : null;

const nftContract = contractABI.length
  ? new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer || provider)
  : null;

module.exports = nftContract;
