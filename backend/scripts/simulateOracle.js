// backend/scripts/simulateOracle.js
const { ethers } = require("hardhat");
require("dotenv").config(); 

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS; 
  if (!contractAddress) {
    console.error("❌ CONTRACT_ADDRESS not set in .env file.");
    process.exit(1);
  }

  const [deployer] = await ethers.getSigners();
  console.log("Using oracle account:", deployer.address);

  const FreshChainNFTFactory = await ethers.getContractFactory("FreshChainNFT");
  const nftContract = new ethers.Contract(contractAddress, FreshChainNFTFactory.interface, deployer);

  // --- Authorize this oracle account if not already done (run once per deployment) ---
  try {
    const isAuthorized = await nftContract.authorizedOracles(deployer.address);
    if (!isAuthorized) {
      console.log("Authorizing oracle account...");
      const tx = await nftContract.addAuthorizedOracle(deployer.address);
      await tx.wait();
      console.log("Oracle account authorized successfully.");
    } else {
      console.log("Oracle account already authorized.");
    }
  } catch (error) {
    console.warn("Could not check/authorize oracle. Ensure contract is deployed and owner has permissions.", error.message);
  }

  // --- Mock Sensor Data Simulation for Multiple NFTs ---

  const tokenIdsToUpdate = [1, 2, 3, 4, 5]; E

  // Maintain state for each token's sensor data
  const sensorDataState = {};
  tokenIdsToUpdate.forEach(id => {
    sensorDataState[id] = {
      temperature: Math.random() * 10 + 5, 
      humidity: Math.random() * 10 + 85,  
      locationIndex: Math.floor(Math.random() * 4) 
    };
  });

  const locations = ["Warehouse A", "Truck 101", "Distribution Center B", "Retail Store C", "Processing Plant X", "Farm Storage"];

  console.log(`\nStarting IoT Oracle simulation for NFTs: ${tokenIdsToUpdate.join(', ')}...`);
  console.log("Press Ctrl+C to stop.");

  // Function to send sensor updates for all defined tokens
  const sendSensorUpdates = async () => {
    for (const tokenId of tokenIdsToUpdate) { // <--- LOOPING THROUGH ALL IDS
      let { temperature, humidity, locationIndex } = sensorDataState[tokenId];

      // Simulate slight variations
      temperature += (Math.random() - 0.5) * 2; // +/- 1 degree
      humidity += (Math.random() - 0.5) * 5; // +/- 2.5%
      
      // Keep values within a reasonable range
      temperature = Math.max(-5, Math.min(15, temperature));
      humidity = Math.max(70, Math.min(100, humidity));

      // Simulate location change every few updates
      if (Math.random() < 0.2) { // 20% chance to change location
        locationIndex = (locationIndex + 1) % locations.length;
      }
      const currentLocation = locations[locationIndex];

      // Update state for next iteration
      sensorDataState[tokenId] = { temperature, humidity, locationIndex };

      try {
        console.log(`Sending update for NFT ${tokenId}: Temp=${temperature.toFixed(1)}°C, Humidity=${humidity.toFixed(1)}%, Loc=${currentLocation}`);
        const tx = await nftContract.updateSensorData(
          tokenId, // Ensure 'tokenId' is used here
          Math.round(temperature),
          Math.round(humidity),
          currentLocation
        );
        await tx.wait();
        console.log(`✅ Sensor data updated on-chain for NFT ${tokenId}. Tx: ${tx.hash.substring(0, 10)}...`);
      } catch (error) {
        console.error(`❌ Error sending sensor update for NFT ${tokenId}:`, error.message);
        if (error.message.includes("Token does not exist")) {
          console.error(`Stopping oracle for NFT ${tokenId}: Token does not exist.`);
          
        }
      }
    }
  };

  // Send initial updates immediately
  await sendSensorUpdates();

  // Schedule updates every 5 seconds
  const intervalId = setInterval(sendSensorUpdates, 5000); 
}

main()
  .then(() => {}) 
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });