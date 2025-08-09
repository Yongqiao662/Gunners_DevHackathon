import React, { useState } from 'react';
import { Bell, Filter, X } from 'lucide-react';
import WalletButton from '../common/WalletButton'; // Assuming correct path
import truncateAddress from '../../utils/truncateAddress'; // Assuming correct path
import Search from '../common/Search'; // Assuming correct path

// This utility function takes a numeric token ID and formats it as "FC-001000".
// It pads the number with leading zeros to a length of 6.
const formatTokenId = (tokenId) => {
  // Ensure the tokenId is a number and convert it to a string.
  const numericId = parseInt(tokenId, 10);
  if (isNaN(numericId)) {
    return tokenId; // Return the original value if it's not a valid number
  }

  // Pad the number with leading zeros to ensure it's at least 6 digits long.
  return `FC-${numericId.toString().padStart(6, '0')}`;
};

/**
 * A card component to display a single product's details.
 * It now uses the `formatTokenId` function to display the NFT ID.
 */
const ProductCard = ({ product, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-emerald-100 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:border-emerald-300"
    style={{ height: '120px' }} // Fixed height
  >
    <div className="flex items-center h-full space-x-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-gray-900">{product.name}</h4>
          <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${product.statusColor}`}>
            {product.status}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-1">From {product.origin}</p>
        <div className="flex items-center justify-between">
          {/* We now use the new formatTokenId utility to display the NFT ID */}
          <span className="text-xs text-gray-500">NFT: {formatTokenId(product.nftId)}</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              product.freshnessScore > 85
                ? 'bg-green-500 animate-pulse shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]'
                : product.freshnessScore > 70
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}></div>
            <span className="text-xs font-medium text-gray-700">{product.freshnessScore}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// This component is provided for context but does not require changes for this task.
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning!';
  if (hour < 18) return 'Good Afternoon!';
  return 'Good Evening!';
}

const DashboardHeader = ({ userAddress, onSearch, disconnectWallet, onFilter }) => {
  const [showDisconnect, setShowDisconnect] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({ freshness: '', status: '', origin: '' });

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 bg-opacity-70 backdrop-blur-md px-6 py-6 border-b border-teal-200 shadow-sm rounded-b-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()} <span className="align-middle">👋</span></h1>
          <p className="text-gray-600">Track Your Fresh Products</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/70 rounded-full flex items-center justify-center group cursor-pointer transition-transform hover:scale-110 shadow">
            <Bell className="w-5 h-5 text-blue-500 group-hover:animate-bounce" />
          </div>
          <div className="relative">
            <WalletButton
              address={userAddress}
              truncateAddress={truncateAddress}
              className="w-10 h-10"
              onClick={() => setShowDisconnect((prev) => !prev)}
            />
            {showDisconnect && (
              <button
                onClick={() => {
                  disconnectWallet();
                  setShowDisconnect(false);
                }}
                className="absolute right-0 mt-2 px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-semibold shadow-lg hover:bg-red-200 transition z-10"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search onSearch={onSearch} />
        </div>
        <button
          className="w-12 h-12 bg-white/70 rounded-xl flex items-center justify-center border border-blue-200 transition-all hover:bg-blue-100 hover:border-purple-300 cursor-pointer shadow"
          onClick={() => setShowFilter(true)}
          aria-label="Filter"
        >
          <Filter className="w-5 h-5 text-purple-500" />
        </button>
        {showFilter && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-20">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] overflow-y-auto relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setShowFilter(false)}><X className="w-5 h-5" /></button>
              <h3 className="text-lg font-bold mb-4 text-gray-900">Filter Products</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Freshness</label>
                <select className="w-full rounded-lg border-gray-200" value={selectedFilter.freshness} onChange={e => setSelectedFilter(f => ({...f, freshness: e.target.value}))}>
                  <option value="">Any</option>
                  <option value=">85">Very Fresh (&gt;85%)</option>
                  <option value=">70">Fresh (&gt;70%)</option>
                  <option value="<=70">Less Fresh (&le;70%)</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full rounded-lg border-gray-200" value={selectedFilter.status} onChange={e => setSelectedFilter(f => ({...f, status: e.target.value}))}>
                  <option value="">Any</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                <input className="w-full rounded-lg border-gray-200" value={selectedFilter.origin} onChange={e => setSelectedFilter(f => ({...f, origin: e.target.value}))} placeholder="e.g. California" />
              </div>
              <button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-2 rounded-xl shadow hover:from-emerald-600 hover:to-teal-600 transition-all"
                onClick={() => { onFilter && onFilter(selectedFilter); setShowFilter(false); }}
              >Apply Filter</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;