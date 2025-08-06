import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductDetail = ({ product, onBack }) => {
  const [onChainProductDetails, setOnChainProductDetails] = useState(null);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null);

  // Helper to truncate Ethereum addresses for display
  const truncateAddress = (address) => {
    if (!address) return 'N/A';
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

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
        // Sort history by timestamp to ensure correct chart display
        const sortedHistory = history.sort((a, b) => a.timestamp - b.timestamp);
        setSensorHistory(sortedHistory);
      } catch (err) {
        console.error("Error fetching sensor history:", err);
        setErrorHistory(err.message);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchOnChainData();
    // Set up an interval to refresh data every 10 seconds (adjust as needed)
    const interval = setInterval(fetchOnChainData, 10000); 
    return () => clearInterval(interval); // Cleanup on unmount
  }, [product?.nftId]);

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
    switch (iconName) {
      case 'Harvested': return '🌿';
      case 'Transported to Packaging': return '🚚';
      case 'Packaged': return '📦';
      case 'Caught': return '🎣';
      case 'Processed & Chilled': return '❄️';
      case 'Shipped to Distributor': return '🚢';
      case 'Collected': return '🐔'; // For eggs
      case 'Inspected & Packaged': return '🔍'; // For eggs
      case 'Delivered to Local Market': return '🏪'; // For eggs
      case 'Washed & Trimmed': return '🚿'; // For broccoli
      case 'Ready for Shipment': return '✅'; // For broccoli
      case 'Harvested': return '🍂'; // For almonds
      case 'Shelled & Sorted': return '🌰'; // For almonds
      case 'Roasted': return '🔥'; // For almonds
      case 'Processed': return '🔪'; // For beef
      case 'Frozen': return '🧊'; // For beef
      case 'Shipped': return '✈️'; // For beef
      case 'Exported': return '🌍'; // For coffee
      case 'Washed & Dried': return '💧'; // For coffee
      case 'Fire': return '🔥'; // For roasted almonds
      case 'Tree': return '🌳'; // For harvested almonds
      case 'Cow': return '🐄'; // For beef
      case 'Faucet': return '💧'; // For washed blueberries
      case 'LeafyGreen': return '🍃'; // General harvest
      case 'Box': return '📦'; // General packaging/shipment prep
      case 'Shop': return '🛒'; // General retail/market
      case 'FishingPole': return '🎣'; // General fishing
      case 'Snowflake': return '❄️'; // General chilling/freezing
      case 'Truck': return '🚚'; // General transport
      case 'Package': return '📦'; // General package
      case 'CoffeeBean': return '☕'; // Coffee specific
      case 'Sun': return '☀️'; // Drying
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
            <div className="col-span-full flex items-center justify-between p-2 bg-emerald-50 rounded-md">
              <span className="font-semibold text-lg">Current Freshness Score:</span> 
              <span className="text-emerald-700 font-bold text-2xl">{onChainProductDetails.freshnessScore}</span>
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