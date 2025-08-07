import { Bell, Filter } from 'lucide-react';
import { useState } from 'react';
import Search from '../common/Search';
import WalletButton from '../common/WalletButton';
import truncateAddress from '../../utils/truncateAddress'; // Correct import path

const DashboardHeader = ({ userAddress, onSearch, disconnectWallet }) => {
  const [showDisconnect, setShowDisconnect] = useState(false);

  return (
    <div className="bg-white px-6 py-6 border-b border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Morning! 👋</h1>
          <p className="text-gray-600">Track Your Fresh Products</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-gray-600" />
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
        
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
          <Filter className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;