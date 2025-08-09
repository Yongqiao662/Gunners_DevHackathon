import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import useWalletConnection from './hooks/useWalletConnection';
import LoginPage from './components/login/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import ProductDetail from './components/product/ProductDetail';
import ScanComponent from './components/common/ScanComponent';
import NFTSearchComponent from './components/common/NFTSearchComponent';
import { mockProducts } from './utils/mockProducts';

const App = () => {
    const {
        isLoggedIn,
        userAddress,
        error: walletError,
        loading: walletLoading,
        connectWallet,
        disconnectWallet,
        truncateAddress,
    } = useWalletConnection();

    const [productData, setProductData] = useState(null);
    const [showingProduct, setShowingProduct] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [showingSearch, setShowingSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const viewProduct = (product) => {
        setProductData(product);
        setShowingProduct(true);
    };

    const handleScanSuccess = async (code) => {
        setIsScanning(false);
        try {
            const response = await fetch(`http://localhost:5000/api/product/${code}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch product data. Server responded with: ${response.status} - ${errorText}`);
            }
            const fetchedProductData = await response.json();
            if (!fetchedProductData.name || !fetchedProductData.nftId || !fetchedProductData.timeline) {
                throw new Error('Received invalid or incomplete product data from the server.');
            }
            viewProduct(fetchedProductData);
        } catch (error) {
            console.error('Error during product scan and fetch:', error);
            alert('Could not retrieve product details. Please try scanning again or check your network. Details: ' + error.message);
         
        }
    };

    

    const renderContent = () => {
        if (!isLoggedIn) {
            return (
                <LoginPage
                    onConnect={connectWallet}
                    loading={walletLoading}
                    error={walletError}
                />
            );
        }

        if (isScanning) {
            return (
                <ScanComponent
                    onScanSuccess={handleScanSuccess}
                    onBack={() => setIsScanning(false)}
                />
            );
        }
        
        // ✅ CORRECTED: This now correctly renders the search component
        if (showingSearch) {
            return (
                <NFTSearchComponent
                    onBack={() => setShowingSearch(false)}
                />
            );
        }
        
        if (showingProduct) {
            return (
                <ProductDetail
                    product={productData}
                    userAddress={userAddress}
                    onBack={() => setShowingProduct(false)}
                />
            );
        }

        return (
            <>
                <div className="flex-1 overflow-y-auto">
                    <Dashboard
                        userAddress={userAddress}
                        truncateAddress={truncateAddress}
                        products={filteredProducts}
                        onSearch={setSearchTerm}
                        onViewProduct={viewProduct}
                        disconnectWallet={disconnectWallet}
                        onShowSearch={() => setShowingSearch(true)}
                    />
                </div>
                <div className="p-4 border-t border-gray-200">
                    <button
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                        onClick={() => setIsScanning(true)}
                    >
                        Scan Product
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm mx-auto shadow-2xl bg-white font-sans overflow-hidden rounded-3xl border-4 border-gray-300 h-[812px] flex flex-col">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;