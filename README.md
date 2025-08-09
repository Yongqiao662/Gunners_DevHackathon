# Gunners_DevHackathon
Blockchain for Good Alliance (BGA)
# 🌍 Project Name – BGA Hackathon 2025

##FreshChain-Blockchain-Powered Food Supply Chain Tracker
FreshChain is a blockchain-enabled supply chain application that ensures end-to-end transparency for agricultural products. It tracks each stage from harvest to retail, storing key milestones securely on the blockchain for verification and trust.

## 🚀 Overview
The global food supply chain often faces issues of fraud, lack of transparency, and data tampering.
FreshChain solves this by combining QR code scanning, blockchain verification, and live chain data tracking, ensuring every step of the product’s journey is visible, traceable, and immutable.
With FreshChain, consumers, retailers, and suppliers can verify authenticity, freshness, and origin with a single scan.

## 🚀 Key Features
Product Timeline Tracking
Each product’s journey is logged on the blockchain with the following milestones:
Harvested – Capture the harvest date and origin farm details.
Transported – Log transportation events, including handler and location.
Quality Check – Record inspection details and freshness score.
Retail Ready – Update product readiness for retail shelves.
Live In-Chain Data – Real-time updates as products move through the chain.
Scan & Track – Users scan QR codes to view full history.
Blockchain Verified – Immutable records ensure data can’t be altered.

## Blockchain Integration
Uses NFT smart contracts to represent product batches.
Each update is stored on-chain with a unique transaction hash.
QR codes link directly to blockchain-verified product data.

## User-Friendly Interface
Mobile and web support for scanning and viewing product timelines.
Clean UI for retailers, suppliers, and consumers.

---

## 🛠️ Tech Stack
- Frontend: React.js
- Backend: Express / Node.js
- Database: Pinata
- Blockchain API: Testnet

---

## 👥 Team Members
- Loh Yong Qiao - Frontend/Backend
- Tai Jin Wei - Backend
- Hong Tze Loon - Backened/Presenter
- Ivan Ooi Jian Chao - Frontend/Presenter

---

## ⚙️ How to Run
1. Clone this repository:
   ```bash
   git clone https://github.com/Yongqiao662/Gunners_DevHackathon.git
   cd freshchain

2. Install dependencies
   ```bash
   cd backend
   npm install

   cd frontend
   npm install

3. Conigure Environment varaiables
   :Create a .env file in both backend/ and frontend/:
    ```bash
   MONGO_URI=your_mongodb_url
   PORT=5000
   PRIVATE_KEY=your_blockchain_private_key
   INFURA_URL=your_infura_rpc_url
   
   # Frontend .env
   REACT_APP_API_URL=http://localhost:5000

 4. Deploy the smart contract
    ```bash
    cd smart-contracts
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network sepolia

 5. Start the app
    ```bash
    cd backend
    node app.js

    cd frontend
    node app.js

## 📲 Usage
Admin logs product details via the dashboard.
Blockchain transaction is created for each timeline milestone.
QR code is generated for each batch.
Consumers scan the QR code to view verified product history.



 

