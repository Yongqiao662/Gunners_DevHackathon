import React, { useState, useEffect } from 'react';

const ProductDetail = ({ product, onBack }) => {
  // State to hold dynamically fetched on-chain product batch details
  const [onChainProductDetails, setOnChainProductDetails] = useState(null);
  // State to hold dynamically fetched on-chain sensor history
  const [sensorHistory, setSensorHistory] = useState([]);
  // State for loading indicators
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null);

  // useEffect to fetch on-chain data when the component mounts or product.nftId changes
  useEffect(() => {
    const fetchOnChainData = async () => {
      if (!product || !product.nftId) {
        setLoadingDetails(false);
        setLoadingHistory(false);
        return;
      }

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
      } catch (err) {
        console.error("Error fetching on-chain product details:", err);
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
        setSensorHistory(history);
      } catch (err) {
        console.error("Error fetching sensor history:", err);
        setErrorHistory(err.message);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchOnChainData();
  }, [product?.nftId]); // Re-run effect if product.nftId changes

  // Helper to format Unix timestamp to readable date/time
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    // Convert string timestamp to Number for Date object
    const date = new Date(Number(timestamp) * 1000); 
    return date.toLocaleString(); // Adjust locale as needed
  };

  // Helper to get icon for timeline events (can be expanded)
  const getTimelineIcon = (iconName) => {
    switch (iconName) {
      case 'Harvested': return '🌿';
      case 'Transported to Packaging': return '🚚';
      case 'Packaged': return '📦';
      case 'Caught': return '🎣';
      case 'Processed & Chilled': return '❄️';
      case 'Shipped to Distributor': return '🚢';
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
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-white text-xl font-bold">
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
            <p><span className="font-semibold">Current Score:</span> <span className="text-emerald-600 font-bold text-lg">{onChainProductDetails.freshnessScore}</span></p>
            <p><span className="font-semibold">Origin:</span> {onChainProductDetails.origin}</p>
            <p><span className="font-semibold">Harvest Date:</span> {formatTimestamp(onChainProductDetails.harvestDate)}</p>
            <p><span className="font-semibold">Current Location:</span> {onChainProductDetails.currentLocation}</p>
            <p><span className="font-semibold">Current Handler:</span> {onChainProductDetails.currentHandler}</p>
            <p><span className="font-semibold">Active:</span> {onChainProductDetails.isActive ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p className="text-gray-600">No on-chain details available.</p>
        )}

        {/* Sensor History Section */}
        <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">Sensor History</h4>
        {loadingHistory ? (
          <p className="text-gray-600">Loading sensor history from blockchain...</p>
        ) : errorHistory ? (
          <p className="text-red-500">Error: {errorHistory}</p>
        ) : sensorHistory.length > 0 ? (
          <div className="space-y-4">
            {sensorHistory.map((reading, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800">{formatTimestamp(reading.timestamp)}</p>
                <p className="text-sm text-gray-700">Temperature: {reading.temperature}°C</p>
                <p className="text-sm text-gray-700">Humidity: {reading.humidity}%</p>
                <p className="text-sm text-gray-700">Location: {reading.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No sensor data recorded yet.</p>
        )}

        {/* Static Timeline (from IPFS metadata, can be merged with sensor history if desired) */}
        <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">Product Timeline (Initial)</h4>
        {product.timeline && product.timeline.length > 0 ? (
          <ul className="space-y-4">
            {product.timeline.map((event, index) => (
              <li key={index} className="flex items-start space-x-3">
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