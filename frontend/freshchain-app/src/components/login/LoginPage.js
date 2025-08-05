import { QrCode, Wallet, Sprout } from 'lucide-react';
import WalletButton from '../common/WalletButton';
import StatusBar from '../common/StatusBar';

const LoginPage = ({ onConnect, loading, error }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 h-full flex flex-col">
      <StatusBar />
      
      <div className="px-6 pt-12 pb-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">FreshChain</h1>
            <p className="text-gray-600 text-lg">Track your food from farm to table</p>
          </div>

          {/* Features Grid */}
          <div className="space-y-4 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Scan & Track</h3>
                  <p className="text-sm text-gray-600">Complete supply chain visibility</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Blockchain Verified</h3>
                  <p className="text-sm text-gray-600">Tamper-proof transparency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="space-y-4">
          <WalletButton 
            onClick={onConnect}
            loading={loading}
            fullWidth
          />
          
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 text-sm text-center font-medium">
              {error}
            </div>
          )}
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Secure connection via MetaMask or Web3 wallet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;