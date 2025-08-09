

# 🌟 Gunners_DevHackathon 🌟

## 👥 Team
- Loh Yong Qiao    : Lead Developer/ Project Architect/ Full Stack Development/ Documentation Writer   @Yongqiao662

- Tai Jin Wei        : Backend Developer/ BlockChain Integration                                         @TaiJinWei

- Hong Tze Loon   : Backend Developer/ BlockChain Integration/ Presenter                              @HongTzeLoon

- Ivan Ooi        : Frontend Developer/ Presenter                                                     @IvanOoi
 
# ✨  FreshChain ✨ 

FreshChain is a revolutionary blockchain-enabled supply chain application that ensures complete transparency and traceability for agricultural products. 

By leveraging blockchain technology, QR code scanning, and real-time data tracking, FreshChain creates an immutable record of every product's journey from farm to table.


<img width="358" height="808" alt="image" src="https://github.com/user-attachments/assets/f76c48ea-6b17-40c9-b5a5-f00577fea27d" />



## 🚀 Overview
The global food supply chain faces critical challenges including fraud, lack of transparency, counterfeiting, and data tampering. These issues result in:

### Consumer distrust in food authenticity
Difficulty in tracing contamination sources
Economic losses due to fraud
Inability to verify sustainable farming practices

### FreshChain solves these problems by:

Creating immutable blockchain records for each product batch
Providing real-time visibility into the supply chain
Enabling instant verification through QR code scanning
Ensuring data integrity and preventing tampering


## ✨ Key Features
### 📊 Product Timeline Tracking

* Harvested: Capture harvest date, farm location, and farmer details
* Transported: Log transportation events with handler information and GPS coordinates
* Quality Check: Record inspection results, freshness scores, and certifications
* Retail Ready: Update product status and shelf-life information
* Live Updates: Real-time chain data as products move through each stage

### 🔗 Blockchain Integration

NFT smart contracts represent unique product batches
Each milestone stored on-chain with unique transaction hash
Immutable records prevent data tampering or fraud
Integration with Polygon network for fast, low-cost transactions

### 📱 QR Code System

Generate unique QR codes for each product batch
Instant scanning reveals complete product history
Mobile-optimized interface for easy consumer access

### 🎯 User-Friendly Interface

Responsive web and mobile applications
Intuitive dashboards for different user roles
Clean, modern UI design
Multi-language support

### 🔐 Security & Verification

Cryptographic verification of all data entries
Role-based access control
Audit trails for all blockchain transactions


### 🏗️ Architecture
<img width="573" height="323" alt="image" src="https://github.com/user-attachments/assets/96923e6f-9cdf-4e65-99a4-937546c449d8" />


ProductRegistry: Main contract managing product lifecycles
BatchNFT: NFT representation of product batches
SupplyChain: Handles milestone updates and verification
AccessControl: Manages user permissions and roles


## 🛠️ Tech Stack
<img width="667" height="227" alt="image" src="https://github.com/user-attachments/assets/a33d2d8b-020f-49dd-b355-918ed751bef3" />



## 📁 Project Structure

<img width="387" height="525" alt="image" src="https://github.com/user-attachments/assets/c62a4831-7bd0-4eb8-84a7-157eac673b4c" />


## 🚀 Getting Started
### Prerequisites

Node.js >= 16.0.0

npm or yarn

MetaMask wallet

Git

Python >= 3.8 (for oracle service)

### Installation

```bash
Clone the repository
git clone https://github.com/Yongqiao662/Gunners_DevHackathon.git
cd FreshChain

Install backend dependencies
cd backend
npm install

Install frontend dependencies
cd ../frontend
npm install

Install Python dependencies
cd ../oracle
pip install -r requirements.txt
```

## Configuration

### Environment Variables
Create .env in the backend/ directory:
env
Blockchain Configuration

PRIVATE_KEY=your_private_key_here
WEB3_PROVIDER_URL=https://rpc.ankr.com/polygon_mumbai/your_api_key
CONTRACT_ADDRESS=deployed_contract_address
ACCOUNT_ADDRESS=your_public_address


### IPFS Configuration
PINATA_API_KEY=your_pinata_api_key

### Start local blockchain
npx hardhat node

### Deploy contracts (in a new terminal)
npx hardhat run scripts/deploy.js --network localhost


## Running the Application

Start the backend server
bash
cd backend
npm start

Server will run on http://localhost:5000

Start the frontend application
bash
cd frontend
npm start

Application will run on http://localhost:3000



## 📱 Usage Guide
### For Farmers/Producers

Register your farm and obtain authentication credentials
Log new harvests with location, date, and product details
Generate QR codes for product batches
Update transportation and handling information

### For Distributors/Transporters

Scan QR codes to access product information
Update location and handling status
Record temperature and storage conditions
Transfer custody to next party in the chain

### For Retailers

Verify product authenticity by scanning QR codes
Update retail status and shelf placement
Monitor product freshness and expiration
Generate consumer-facing QR codes

### For Consumers

Scan QR codes on products
View complete product journey and history
Verify authenticity and sustainability claims
Report issues or provide feedback


## 🔧 API Documentation

Authentication Endpoints

POST /api/auth/register     - Register new user

POST /api/auth/login        - User login

POST /api/auth/refresh      - Refresh JWT token

### Product Management

GET    /api/products        - Get all products

POST   /api/products        - Create new product batch

GET    /api/products/:id    - Get specific product

PUT    /api/products/:id    - Update product status

DELETE /api/products/:id    - Delete product batch

### Supply Chain Tracking

POST /api/supply-chain/harvest     - Log harvest event

POST /api/supply-chain/transport   - Log transport event  

POST /api/supply-chain/quality     - Log quality check

POST /api/supply-chain/retail      - Log retail status

GET  /api/supply-chain/:batch_id   - Get full chain history

### QR Code Generation

POST /api/qr/generate       - Generate QR code for batch

GET  /api/qr/:code          - Decode QR code and get data

For detailed API documentation, see API.md


## Deploy build folder to hosting platform

Smart Contract Deployment (Testnet)

npx hardhat run scripts/deploy.js --network localhost




## 🤝 Contributing
We welcome contributions to FreshChain! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

Development Guidelines

Follow the existing code style and conventions
Write tests for new features
Update documentation as needed
Ensure all tests pass before submitting PR


### 🆘 Troubleshooting
Common Issues
MetaMask Connection Issues

Ensure MetaMask is installed and connected to the correct network
Check that you have sufficient MATIC tokens for gas fees

### Smart Contract Deployment Failures

Verify your private key and network configuration
Ensure you have enough tokens for deployment gas fees
Check that contract code compiles without errors

### IPFS Upload Failures

Verify Pinata API keys are correct
Check internet connection and file size limits
Ensure files are in supported formats

## Getting Help

Check the Issues page
Join our Discord community
Email us at freshchain@example.com


## 🔮 Roadmap
Phase 1 

✅ Core blockchain integration
✅ QR code generation and scanning
✅ Basic supply chain tracking
✅ Web interface

Phase 2 (Q2 2024)

✅ Mobile app development
✅ IoT sensor integration
🔄 Advanced analytics dashboard
🔄 Multi-chain support

Phase 3 (Q3 2024)

📋 AI-powered quality prediction
📋 Carbon footprint tracking
📋 Marketplace integration
📋 Enterprise API

Phase 4 (Q4 2024)

📋 Global certification integration
📋 Advanced fraud detection
📋 Supply chain optimization AI
📋 Public blockchain deployment









 

