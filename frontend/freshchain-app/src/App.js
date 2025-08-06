import React, { useState } from 'react';
import useWalletConnection from './hooks/useWalletConnection';
import LoginPage from './components/login/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import ProductDetail from './components/product/ProductDetail';
import ScanComponent from './components/common/ScanComponent'; // Import the scanner component
import { mockProducts } from './utils/mockProducts'; // Keep mockProducts for filtering dashboard, but not for scan

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
  const [isScanning, setIsScanning] = useState(false); // State for the scan mode
  const [searchTerm, setSearchTerm] = useState('');

  // Console logs for debugging the app's state flow
  console.log('isLoggedIn:', isLoggedIn);
  console.log('isScanning:', isScanning);
  console.log('showingProduct:', showingProduct);

  // Filter products for the Dashboard view (still using mockProducts here)
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to set product data and switch to ProductDetail view
  const viewProduct = (product) => {
    setProductData(product);
    setShowingProduct(true);
  };

  // Handles the successful scan, now integrating with your backend
  const handleScanSuccess = async (code) => {
    setIsScanning(false); // Stop scanning and hide the scanner

    try {
      // 🚀 This is the real API call to your backend! 🚀
      // It will fetch product details based on the scanned 'code' (NFT ID).
      const response = await fetch(`http://localhost:5000/api/product/${code}`);

      if (!response.ok) {
        // If the server responds with an error status (e.g., 404, 500)
        const errorText = await response.text(); // Get error message from server if available
        throw new Error(`Failed to fetch product data. Server responded with: ${response.status} - ${errorText}`);
      }
      
      const fetchedProductData = await response.json();
      
      // Basic validation to ensure the fetched data has expected properties
      // Your ProductDetail component expects at least 'name', 'nftId', and 'timeline'
      if (!fetchedProductData.name || !fetchedProductData.nftId || !fetchedProductData.timeline) {
        throw new Error('Received invalid or incomplete product data from the server.');
      }
      
      viewProduct(fetchedProductData); // Pass the validated data to the ProductDetail component
      
    } catch (error) {
      console.error('Error during product scan and fetch:', error);
      // Use a more user-friendly message for the alert
      alert('Could not retrieve product details. Please try scanning again or check your network. Details: ' + error.message);
      setIsScanning(true); // Return to the scanner on error if there's an error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-sm mx-auto shadow-2xl bg-white font-sans overflow-hidden rounded-3xl border-4 border-gray-300 h-[812px] flex flex-col">
        {!isLoggedIn ? (
          // 1. Login Page: Shown if user is not logged in
          <LoginPage 
            onConnect={connectWallet} 
            loading={walletLoading} 
            error={walletError} 
          />
        ) : isScanning ? (
          // 2. Scanning Mode: Shown if user clicked 'Scan Product'
          <ScanComponent onScanSuccess={handleScanSuccess} />
        ) : showingProduct ? (
          // 3. Product Detail Page: Shown if a product is selected/scanned
          <ProductDetail 
            product={productData} 
            onBack={() => setShowingProduct(false)}
          />
        ) : (
          // 4. Dashboard: Default view after login, before scanning or viewing product
          <>
            <div className="flex-1 overflow-y-auto">
              <Dashboard 
                userAddress={userAddress}
                truncateAddress={truncateAddress}
                products={filteredProducts}
                onSearch={setSearchTerm}
                onViewProduct={viewProduct}
              />
            </div>
            {/* Removed debugging border and background from this div */}
            <div className="p-4"> 
              <button
                className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold mt-1"
                onClick={() => setIsScanning(true)} // Transition to scanning mode
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