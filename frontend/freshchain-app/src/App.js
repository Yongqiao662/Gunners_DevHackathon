import React, { useState } from 'react';
import useWalletConnection from './hooks/useWalletConnection';
import LoginPage from './components/login/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import ProductDetail from './components/product/ProductDetail';
import ScanComponent from './components/common/ScanComponent'; // Import the scanner component
import { mockProducts } from './utils/mockProducts';

const App = () => {
  const {
    isLoggedIn,
    userAddress,
    error: walletError,
    loading: walletLoading,
    connectWallet,
    truncateAddress,
  } = useWalletConnection();
  
  const [productData, setProductData] = useState(null);
  const [showingProduct, setShowingProduct] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // NEW STATE for the scan mode
  const [searchTerm, setSearchTerm] = useState('');

  console.log('isLoggedIn:', isLoggedIn);
  console.log('isScanning:', isScanning);
  console.log('showingProduct:', showingProduct);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewProduct = (product) => {
    setProductData(product);
    setShowingProduct(true);
  };

  const handleScanSuccess = async (code) => {
    setIsScanning(false); // Stop scanning
    
    // 🚨 This is where you would fetch data from your backend based on the scanned code 🚨
    // For now, let's use a mock product that matches the scanned code
    const scannedProduct = mockProducts.find(p => p.nftId === code);
    
    if (scannedProduct) {
      viewProduct(scannedProduct);
    } else {
      // Handle case where product is not found
      alert(`Product with NFT ID "${code}" not found.`);
      // You can decide to go back to dashboard or stay on the scanner
      setIsScanning(false); 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-sm mx-auto shadow-2xl bg-white font-sans overflow-hidden rounded-3xl border-4 border-gray-300 h-[812px] flex flex-col"> {/* ADDED flex flex-col here */}
        {!isLoggedIn ? (
          // 1. Login Page
          <LoginPage 
            onConnect={connectWallet} 
            loading={walletLoading} 
            error={walletError} 
          />
        ) : isScanning ? (
          // 2. Scanning Mode
          <ScanComponent onScanSuccess={handleScanSuccess} />
        ) : showingProduct ? (
          // 3. Product Detail Page
          <ProductDetail 
            product={productData} 
            onBack={() => setShowingProduct(false)}
          />
        ) : (
          // 4. Dashboard
          <>
            <div className="flex-1 overflow-y-auto"> {/* ADDED flex-1 overflow-y-auto */}
              <Dashboard 
                userAddress={userAddress}
                truncateAddress={truncateAddress}
                products={filteredProducts}
                onSearch={setSearchTerm}
                onViewProduct={viewProduct}
              />
            </div>
            <div className="p-4"> {/* Kept border for debugging */}
              <button
                className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold mt-1"
                onClick={() => setIsScanning(true)} // Toggles the new state to 'true'
              >
                Scan Product
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
