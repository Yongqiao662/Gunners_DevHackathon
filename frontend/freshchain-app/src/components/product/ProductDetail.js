import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductDetail = ({ product, userAddress, onBack, onFreshnessScoreUpdate }) => {

  console.log('*** PRODUCT DETAIL COMPONENT IS LOADING ***');
  
  const [onChainProductDetails, setOnChainProductDetails] = useState(null);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null);

  // NEW: State for transfer functionality
  const [showTransfer, setShowTransfer] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(null);

  // Helper to truncate Ethereum addresses for display
  const truncateAddress = (address) => {
    if (!address) return 'N/A';
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  // NEW: Function to handle the product transfer
  const handleTransfer = async () => {
    if (!recipientAddress || !product || !userAddress) {
      setTransferError('Please provide a valid recipient address and ensure you are logged in.');
      return;
    }

    setIsTransferring(true);
    setTransferError(null);
    setTransferSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: userAddress,
          to: recipientAddress,
          tokenId: product.nftId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Transfer failed with status: ${response.status}`);
      }

      const successData = await response.json();
      setTransferSuccess(`Transfer successful! Transaction hash: ${successData.transactionHash.substring(0, 10)}...`);
      setShowTransfer(false); // Hide transfer form on success
      setRecipientAddress(''); // Clear recipient address
      
    } catch (err) {
      console.error("Transfer error:", err);
      setTransferError(err.message);
    } finally {
      setIsTransferring(false);
    }
  };

  useEffect(() => {
    // 🐛 DEBUG LOG: This will fire every time the useEffect hook is triggered.
    console.log('useEffect triggered with product:', product);

    const fetchOnChainData = async () => {
      if (!product || !product.nftId) {
        setLoadingDetails(false);
        setLoadingHistory(false);
        // 🐛 DEBUG LOG: This will tell us if the useEffect is stopping here.
        console.warn('⚠️ Product or NFT ID is missing. Not fetching data.');
        return;
      }
      
      // 🐛 DEBUG LOG: This confirms the fetch call is being made.
      console.log(`Fetching data for NFT ID: ${product.nftId}...`);

      // Fetch Product Batch Details
      setLoadingDetails(true);
      setErrorDetails(null);
      try {
        const detailsResponse = await fetch(`http://localhost:5000/api/product/${product.nftId}/details`);
        if (!detailsResponse.ok) {
          const errorText = await detailsResponse.text();
          throw new Error(`Failed to fetch on-chain details: ${detailsResponse.status} - ${errorText}`);
        }
        const details = await detailsResponse.json();
        setOnChainProductDetails(details);

        // Notify parent of live freshness score
        if (onFreshnessScoreUpdate && details.freshnessScore !== undefined) {
          onFreshnessScoreUpdate(details.freshnessScore);
        }
      } catch (err) {
        console.error("❌ Error fetching on-chain product details:", err);
        setErrorDetails(err.message);
      } finally {
        setLoadingDetails(false);
      }

      // Fetch Sensor History
      setLoadingHistory(true);
      setErrorHistory(null);
      try {
        const historyResponse = await fetch(`http://localhost:5000/api/product/${product.nftId}/history`);
        if (!historyResponse.ok) {
          const errorText = await historyResponse.text();
          throw new Error(`Failed to fetch sensor history: ${historyResponse.status} - ${errorText}`);
        }
        const history = await historyResponse.json();
        const sortedHistory = history.sort((a, b) => a.timestamp - b.timestamp);
        
        // 🐛 DEBUG LOG: The critical log showing the fetched data.
        console.log("✅ Fetched Sensor History:", sortedHistory);
        
        setSensorHistory(sortedHistory);
      } catch (err) {
        console.error("❌ Error fetching sensor history:", err);
        setErrorHistory(err.message);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchOnChainData();
    const interval = setInterval(fetchOnChainData, 10000); 
    return () => clearInterval(interval); // Cleanup on unmount
  }, [product, product?.nftId]);

  // Helper to format Unix timestamp to readable date/time for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(Number(timestamp) * 1000); 
    return date.toLocaleString();
  };

  // Helper to format Unix timestamp for XAxis ticks (shorter format)
  const formatChartXAxisTick = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper to get icon for timeline events (can be expanded)
  const getTimelineIcon = (iconName) => {
    const normalized = iconName?.toLowerCase();
    switch (normalized) {
      case 'harvested': return '🌿';
      case 'packaged': return '📦';
      case 'shipped': return '✈️';
      case 'transported': return '🚚';
      case 'quality check': return '✅';
      case 'retail ready': return '🛒';
      case 'caught': return '🎣';
      case 'processed & chilled': return '❄️';
      case 'shipped to distributor': return '🚢';
      case 'collected': return '🐔'; // For eggs
      case 'inspected & packaged': return '🔍'; // For eggs
      case 'delivered to local market': return '🏪'; // For eggs
      case 'washed & trimmed': return '🚿'; // For broccoli
      case 'ready for shipment': return '✅'; // For broccoli
      case 'shelled & sorted': return '🌰'; // For almonds
      case 'roasted': return '🔥'; // For almonds
      case 'processed': return '🔪'; // For beef
      case 'frozen': return '🧊'; // For beef
      case 'exported': return '🌍'; // For coffee
      case 'washed & dried': return '💧'; // For coffee
      case 'fire': return '🔥'; // For roasted almonds
      case 'tree': return '🌳'; // For harvested almonds
      case 'cow': return '🐄'; // For beef
      case 'faucet': return '💧'; // For washed blueberries
      case 'leafygreen': return '🍃'; // General harvest
      case 'box': return '📦'; // General packaging/shipment prep
      case 'shop': return '🛒'; // General retail/market
      case 'fishingpole': return '🎣'; // General fishing
      case 'snowflake': return '❄️'; // General chilling/freezing
      case 'truck': return '🚚'; // General transport
      case 'package': return '📦'; // General package
      case 'coffeebean': return '☕'; // Coffee specific
      case 'sun': return '☀️'; // Drying
      default: return '📍';
    }
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p>No product selected.</p>
        <button 
          onClick={onBack} 
          className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl overflow-hidden">
      {/* Header - Changed to grey */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 text-black p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-black text-xl font-bold">
          &larr;
        </button>
        <h2 className="text-xl font-bold">Product Details</h2>
        <div></div> {/* Spacer */}
      </div>

      {/* Product Image and Basic Info (from IPFS metadata) */}
      <div className="p-4 bg-gray-50 flex flex-col items-center">
        <img 
          src={product.image || "https://placehold.co/600x400/CCCCCC/000000?text=No+Image"} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-lg shadow-md mb-4" 
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-gray-700 font-medium">NFT ID: {product.nftId}</p>
      </div>

      {/* Dynamic On-Chain Details Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Live On-Chain Data</h4>
        {loadingDetails ? (
          <p className="text-gray-600">Loading product details from blockchain...</p>
        ) : errorDetails ? (
          <p className="text-red-500">Error: {errorDetails}</p>
        ) : onChainProductDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm">
            <div className="col-span-full flex items-center justify-between p-2 bg-emerald-50 rounded-md">
              <span className="font-semibold text-lg">Current Freshness Score:</span> 
              <span className="text-emerald-700 font-bold text-2xl">
                {product.freshnessScore}
              </span>
            </div>
            <p><span className="font-semibold">Origin:</span> {onChainProductDetails.origin}</p>
            <p><span className="font-semibold">Harvest Date:</span> {formatTimestamp(onChainProductDetails.harvestDate)}</p>
            <p><span className="font-semibold">Current Location:</span> {onChainProductDetails.currentLocation}</p>
            <p><span className="font-semibold">Current Handler:</span> {truncateAddress(onChainProductDetails.currentHandler)}</p>
            <p><span className="font-semibold">Active:</span> {onChainProductDetails.isActive ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p className="text-gray-600">No on-chain details available.</p>
        )}

        {/* Transfer Section - Always visible, no owner verification */}
        <div className="mt-6">
          <button
            onClick={() => setShowTransfer(!showTransfer)}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            {showTransfer ? 'Cancel Transfer' : 'Transfer Product'}
          </button>
          
          {showTransfer && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
              <h5 className="font-semibold mb-2">Transfer to New Owner</h5>
              <input
                type="text"
                placeholder="Enter recipient wallet address"
                className="w-full p-2 border border-gray-300 rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                disabled={isTransferring}
              />
              <button
                onClick={handleTransfer}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                disabled={isTransferring}
              >
                {isTransferring ? 'Transferring...' : 'Confirm Transfer'}
              </button>
              {transferSuccess && <p className="mt-2 text-sm text-green-600 text-center">{transferSuccess}</p>}
              {transferError && <p className="mt-2 text-sm text-red-600 text-center">{transferError}</p>}
            </div>
          )}
        </div>

        {/* Sensor History Section */}
        <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">Sensor History</h4>
        {loadingHistory ? (
          <p className="text-gray-600">Loading sensor history from blockchain...</p>
        ) : errorHistory ? (
          <p className="text-red-500">Error: {errorHistory}</p>
        ) : sensorHistory.length > 0 ? (
          <>
            <div className="w-full h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sensorHistory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={formatChartXAxisTick} />
                  <YAxis yAxisId="left" stroke="#8884d8" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }} />
                  <Tooltip labelFormatter={formatTimestamp} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} name="Temperature" />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {sensorHistory.map((reading, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{formatTimestamp(reading.timestamp)}</p>
                    <p className="text-sm text-gray-700">Location: {reading.location}</p>
                  </div>
                  <div className="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 text-right">
                    <p className="text-sm text-gray-700">Temp: {reading.temperature}°C</p>
                    <p className="text-sm text-gray-700">Humidity: {reading.humidity}%</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600">No sensor data recorded yet.</p>
        )}

        {/* Static Timeline (from IPFS metadata) */}
        <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">Product Timeline (Initial Metadata)</h4>
        {product.timeline && product.timeline.length > 0 ? (
          <ul className="space-y-4">
            {product.timeline.map((event, index) => (
              <li key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                <div className="flex-shrink-0 text-2xl">
                  {getTimelineIcon(event.event)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{event.event}</p>
                  <p className="text-sm text-gray-600">Location: {event.location}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(event.timestamp).toLocaleString()}</p>
                  {event.notes && <p className="text-xs text-gray-500 italic">Notes: {event.notes}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No initial timeline data available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;