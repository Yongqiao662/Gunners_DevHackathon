import React, { useState } from 'react';
import { Search as SearchIcon, Package, MapPin, Calendar, Thermometer, Zap, CheckCircle, AlertCircle } from 'lucide-react';

// The Search input component is defined here for use within NFTSearchComponent.
const SearchInput = ({ onSearch, isLoading }) => (
    <div className="relative">
        <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-emerald-600 drop-shadow-md pointer-events-none" />
            <input
                type="text"
                placeholder="Enter NFT ID "
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch(e.target.value);
                    }
                }}
                className="w-full pl-12 pr-12 py-3 bg-white/60 backdrop-blur-md rounded-xl border border-emerald-100 shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all group"
            />
            {isLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            )}
        </div>
    </div>
);


const NFTSearchComponent = ({ onBack }) => { // ✅ Correctly receives onBack prop
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [isBuying, setIsBuying] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState(null); // 'success' or 'error'

    // Mock NFT database
    const [mockNFTDatabase, setMockNFTDatabase] = useState({
        'FC001234': {
            nftId: 'FC001234',
            name: 'Organic Tomatoes',
            category: 'Vegetables',
            origin: 'Green Valley Farm, California',
            harvestDate: '2025-08-07',
            currentLocation: 'Fresh Market Downtown',
            temperature: '4°C',
            freshness: 94,
            owner: '0x742d35Cc6634C0532925a3b8d404E532ED486c91',
            status: 'In Transit',
            certifications: ['Organic', 'USDA Certified'],
            supplyChain: [
                { stage: 'Harvested', date: '2025-08-07', location: 'Green Valley Farm' },
                { stage: 'Packed', date: '2025-08-07', location: 'Processing Center' },
                { stage: 'Shipped', date: '2025-08-08', location: 'Distribution Hub' },
                { stage: 'In Transit', date: '2025-08-09', location: 'Fresh Market Downtown' }
            ],
            price: '$4.99/kg',
            quantity: '25kg',
            quality: 'Grade A'
        },
        'FC005678': {
            nftId: 'FC005678',
            name: 'Fresh Salmon',
            category: 'Seafood',
            origin: 'Pacific Coast Fishery, Oregon',
            harvestDate: '2025-08-08',
            currentLocation: 'Seafood Market',
            temperature: '2°C',
            freshness: 98,
            owner: '0x8ba1f109551bD432803012645Hac136c60a9A3',
            status: 'Available',
            certifications: ['Wild Caught', 'Sustainable Fishing'],
            supplyChain: [
                { stage: 'Caught', date: '2025-08-08', location: 'Pacific Coast' },
                { stage: 'Processed', date: '2025-08-08', location: 'Coastal Processing Plant' },
                { stage: 'Quality Checked', date: '2025-08-09', location: 'Quality Control Lab' },
                { stage: 'Ready for Sale', date: '2025-08-09', location: 'Seafood Market' }
            ],
            price: '$18.99/kg',
            quantity: '12kg',
            quality: 'Premium'
        },
        'FC009876': {
            nftId: 'FC009876',
            name: 'Organic Apples',
            category: 'Fruits',
            origin: 'Mountain View Orchard, Washington',
            harvestDate: '2025-08-05',
            currentLocation: 'Storage Facility',
            temperature: '1°C',
            freshness: 87,
            owner: '0x123f109551bD432803012645Hac136c60a9B4',
            status: 'Temperature Alert',
            certifications: ['Organic', 'Non-GMO'],
            supplyChain: [
                { stage: 'Harvested', date: '2025-08-05', location: 'Mountain View Orchard' },
                { stage: 'Sorted', date: '2025-08-06', location: 'Packing House' },
                { stage: 'Quality Control', date: '2025-08-07', location: 'Quality Lab' },
                { stage: 'Storage', date: '2025-08-08', location: 'Cold Storage Facility' }
            ],
            price: '$3.50/kg',
            quantity: '100kg',
            quality: 'Grade B+'
        }
    });

    const handleSearch = (nftId) => {
        const query = nftId.toUpperCase().trim();
        setSearchQuery(query);
        setPurchaseStatus(null);
        setSearchResult(null);

        if (!query) return;
        setIsLoading(true);

        setTimeout(() => {
            const result = mockNFTDatabase[query];
            setSearchResult(result || null);
            setIsLoading(false);
            if (result && !searchHistory.includes(query)) {
                setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
            }
        }, 800);
    };

    const handlePurchase = async () => {
        if (!searchResult || isBuying) return;
        setIsBuying(true);
        setPurchaseStatus(null);
        const newOwnerAddress = '0xYourNewBuyerWalletAddress...';
        const transactionSucceeded = Math.random() > 0.1; // 90% success chance

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (transactionSucceeded) {
                const updatedProduct = { ...mockNFTDatabase[searchResult.nftId], owner: newOwnerAddress, status: 'Sold' };
                setMockNFTDatabase(prevDb => ({ ...prevDb, [searchResult.nftId]: updatedProduct }));
                setPurchaseStatus('success');
                setSearchResult(updatedProduct);
            } else {
                throw new Error("Transaction failed on the blockchain.");
            }
        } catch (error) {
            console.error("Purchase failed:", error);
            setPurchaseStatus('error');
        } finally {
            setIsBuying(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Available': 'text-green-600 bg-green-100',
            'In Transit': 'text-blue-600 bg-blue-100',
            'Temperature Alert': 'text-red-600 bg-red-100',
            'Sold': 'text-purple-600 bg-purple-100'
        };
        return colors[status] || 'text-gray-600 bg-gray-100';
    };

    const getFreshnessColor = (freshness) => {
        if (freshness >= 90) return 'text-green-600';
        if (freshness >= 80) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="flex-1 bg-gray-50 p-4 flex flex-col font-sans">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4 flex-shrink-0">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800">Search & Buy NFT</h1>
            </div>

            {/* Search Area */}
            <div className="flex-shrink-0">
                <SearchInput onSearch={handleSearch} isLoading={isLoading} />
                {searchHistory.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-2">
                        <span className="font-semibold">Recent:</span>
                        {searchHistory.map((id) => (
                            <button key={id} onClick={() => handleSearch(id)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-mono text-gray-600 transition-colors">
                                {id}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto mt-4 space-y-4">
                {purchaseStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <span>Purchase successful! Ownership of {searchResult?.name} has been transferred.</span>
                    </div>
                )}
                {purchaseStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center space-x-3">
                        <AlertCircle className="w-6 h-6 flex-shrink-0" />
                        <span>Purchase failed. Please try again.</span>
                    </div>
                )}
                {searchQuery && !searchResult && !isLoading && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center mt-6">
                        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-yellow-800">NFT Not Found</h3>
                        <p className="text-yellow-700">No product found for ID: <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{searchQuery}</span></p>
                    </div>
                )}
                {searchResult && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Product Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                             <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{searchResult.name}</h2>
                                    <p className="text-blue-100 font-mono text-xs">ID: {searchResult.nftId}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(searchResult.status)}`}>
                                    {searchResult.status}
                                </div>
                            </div>
                        </div>
                        {/* Details */}
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {/* Grid items here */}
                                <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg"><MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" /><div><p className="text-xs text-gray-500">Location</p><p className="font-semibold">{searchResult.currentLocation}</p></div></div>
                                <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg"><Calendar className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" /><div><p className="text-xs text-gray-500">Harvest</p><p className="font-semibold">{searchResult.harvestDate}</p></div></div>
                                <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg"><Thermometer className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" /><div><p className="text-xs text-gray-500">Temp</p><p className="font-semibold">{searchResult.temperature}</p></div></div>
                                <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg"><Zap className={`w-4 h-4 mt-1 flex-shrink-0 ${getFreshnessColor(searchResult.freshness)}`} /><div><p className="text-xs text-gray-500">Freshness</p><p className={`font-bold ${getFreshnessColor(searchResult.freshness)}`}>{searchResult.freshness}%</p></div></div>
                            </div>
                             {/* Purchase Button */}
                            <button onClick={handlePurchase} disabled={isBuying || searchResult.status === 'Sold'} className={`w-full text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center ${isBuying ? 'bg-gray-400 cursor-not-allowed' : searchResult.status === 'Sold' ? 'bg-purple-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                {isBuying ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /><span>Purchasing...</span></> : (searchResult.status === 'Sold' ? 'Product Sold' : `Buy for ${searchResult.price}`)}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTSearchComponent;