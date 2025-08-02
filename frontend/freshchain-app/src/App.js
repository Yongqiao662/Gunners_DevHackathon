import React, { useState } from 'react';
import { Truck, Store, Package, LeafyGreen, Wallet, QrCode, ChevronLeft, MoreHorizontal, Share, Search, Bell, Plus, Filter, ArrowUpRight, Eye, Signal, BatteryCharging, Wifi } from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showingProduct, setShowingProduct] = useState(false);

  // Mock data for multiple products
  const mockProducts = [
    {
      id: 1,
      name: 'Organic Avocados',
      origin: 'California, USA',
      freshnessScore: 92,
      status: 'In Transit',
      statusColor: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=120&fit=crop',
      nftId: '0x1A2B3C4D',
      timeline: [
        { event: 'Harvested', location: 'Avocado Grove', timestamp: '2024-07-28T10:00:00Z', icon: <LeafyGreen className="w-4 h-4" />, completed: true },
        { event: 'Transported', location: 'Los Angeles', timestamp: '2024-07-28T18:00:00Z', icon: <Truck className="w-4 h-4" />, completed: true },
        { event: 'Quality Check', location: 'Phoenix', timestamp: '2024-07-29T08:30:00Z', icon: <Package className="w-4 h-4" />, completed: false },
        { event: 'Retail Ready', location: 'Store', timestamp: '2024-07-29T16:45:00Z', icon: <Store className="w-4 h-4" />, completed: false },
      ]
    },
    {
      id: 2,
      name: 'Fresh Salmon',
      origin: 'Norway',
      freshnessScore: 88,
      status: 'Delivered',
      statusColor: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&h=120&fit=crop',
      nftId: '0x2B3C4D5E'
    },
    {
      id: 3,
      name: 'Organic Tomatoes',
      origin: 'Mexico',
      freshnessScore: 76,
      status: 'Processing',
      statusColor: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1546470427-e2568b0d9e84?w=200&h=120&fit=crop',
      nftId: '0x3C4D5E6F'
    }
  ];

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 2000);
  };

  const viewProduct = (product) => {
    setProductData(product);
    setShowingProduct(true);
  };

  const StatusBar = () => (
    <div className="flex justify-between items-center text-black text-sm font-semibold px-6 py-3">
      <span>9:41</span>
      <div className="flex items-center space-x-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <BatteryCharging className="w-4 h-4" />
      </div>
    </div>
  );

  // Login Page
  const LoginPage = () => (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 h-full flex flex-col">
      <StatusBar />
      {/* Hero Section */}
      <div className="px-6 pt-12 pb-8 flex-1">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <LeafyGreen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">FreshChain</h1>
          <p className="text-gray-600 text-lg">Track your food from farm to table</p>
        </div>
        {/* Features */}
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
        {/* Login Button */}
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              'Connect Wallet'
            )}
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Secure connection via MetaMask or Web3 wallet
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Header
  const DashboardHeader = () => (
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
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">JD</span>
          </div>
        </div>
      </div>
      {/* Search and Filter */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
          <Filter className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );

  // Stats Cards
  const StatsCards = () => (
    <div className="px-6 py-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-6 h-6 opacity-80" />
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </div>
          <p className="text-2xl font-bold">147</p>
          <p className="text-sm opacity-80">Products Tracked</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <LeafyGreen className="w-6 h-6 opacity-80" />
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </div>
          <p className="text-2xl font-bold">89%</p>
          <p className="text-sm opacity-80">Avg Freshness</p>
        </div>
      </div>
    </div>
  );

  // Product List
  const ProductList = () => (
    <div className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Shipments</h3>
        <button className="text-emerald-600 font-medium text-sm">View All</button>
      </div>
      <div className="space-y-3">
        {mockProducts.map((product, index) => (
          <div
            key={product.id}
            onClick={() => viewProduct(product)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
            style={{
              animation: `slideInUp 0.6s ease-out ${index * 0.1}s forwards`,
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-xl object-cover"
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
                  <span className="text-xs text-gray-500">NFT: {product.nftId}</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      product.freshnessScore > 85 ? 'bg-green-500' :
                       product.freshnessScore > 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-xs font-medium text-gray-700">{product.freshnessScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Product Detail View
  const ProductDetail = () => {
    if (!productData) return null;
    return (
      <div className="bg-gray-50 h-full flex flex-col">
        <StatusBar />
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <button
            onClick={() => setShowingProduct(false)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="font-semibold text-gray-900">Product Details</h1>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Share className="w-5 h-5 text-gray-700" />
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <MoreHorizontal className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {/* Product Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative">
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                  productData.freshnessScore > 85 ? 'bg-green-500' :
                   productData.freshnessScore > 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {productData.freshnessScore}% Fresh
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{productData.name}</h2>
              <p className="text-gray-600 mb-1">Origin: <span className="font-medium">{productData.origin}</span></p>
              <p className="text-xs text-gray-500 font-mono">NFT ID: {productData.nftId}</p>
            </div>
          </div>
          {/* Timeline */}
          {productData.timeline && (
            <div className="mt-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Supply Chain Journey</h3>
                <div className="space-y-4">
                  {productData.timeline.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <div className={step.completed ? 'text-green-600' : 'text-gray-400'}>
                          {step.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{step.event}</h4>
                        <p className="text-sm text-gray-600">{step.location}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(step.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Dashboard View
  const Dashboard = () => (
    <div className="bg-gray-50 h-full flex flex-col">
      <StatusBar />
      <DashboardHeader />
      <div className="flex-1 overflow-y-auto">
        <StatsCards />
        <ProductList />
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-sm mx-auto shadow-2xl bg-white font-sans overflow-hidden rounded-3xl border-4 border-gray-300 h-[812px]">
        <style>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        {!isLoggedIn ? (
          <LoginPage />
        ) : showingProduct ? (
          <ProductDetail />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
};

export default App;
