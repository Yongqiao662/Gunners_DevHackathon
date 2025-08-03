const Web3 = require('web3');
require('dotenv').config();

// Connect to your provider (e.g., Infura or MaticVigil)
const web3 = new Web3(process.env.WEB3_PROVIDER_URL || process.env.INFURA_URL);

// Load your wallet using private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

module.exports = { web3, account };
