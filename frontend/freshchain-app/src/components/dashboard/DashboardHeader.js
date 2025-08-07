import { Bell, Filter, X } from 'lucide-react';
import { useState } from 'react';
import Search from '../common/Search';
import WalletButton from '../common/WalletButton';
import truncateAddress from '../../utils/truncateAddress'; // Correct import path

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

export default DashboardHeader;