require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // IMPORTANT: Ensure this matches the pragma in your NFT.sol (e.g., ^0.8.19)
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // This is the default address for 'npx hardhat node'
    }
  }
};
