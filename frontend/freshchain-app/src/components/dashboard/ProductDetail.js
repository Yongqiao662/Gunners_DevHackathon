import { ChevronLeft, Share, MoreHorizontal, LeafyGreen, Truck, Package, Store } from 'lucide-react';
import React, { useState } from 'react';
import ScanComponent from '../common/ScanComponent'; // Adjust path if needed
import ProductHistory from './ProductHistory'; // Assuming this component exists

const ProductDetail = ({ product, onBack }) => {
  if (!product) return null;

  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const renderIcon = (iconName) => {
    const icons = {
      LeafyGreen: <LeafyGreen className="w-4 h-4" />,
      Truck: <Truck className="w-4 h-4" />,
      Package: <Package className="w-4 h-4" />,
      Store: <Store className="w-4 h-4" />
    };
    return icons[iconName] || null;
  };

  // Handler for scan
  const handleScan = async () => {
    setScanning(true);
    try {
      const result = await ScanComponent.scan(); // If ScanComponent exposes a scan method
      setScanResult(result);
    } catch (e) {
      setScanResult('Scan failed');
    }
    setScanning(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-sm mx-auto shadow-2xl bg-white font-sans overflow-hidden rounded-3xl border-4 border-gray-300 h-[812px]">
        <div className="bg-gray-50 h-full flex flex-col">
          {/* Header */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="font-bold text-gray-900 text-2xl">Product Details</h1>
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Share className="w-5 h-5 text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <MoreHorizontal className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Product Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
              <div className="relative h-48 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    product.freshnessScore > 85 ? 'bg-green-500' :
                    product.freshnessScore > 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {product.freshnessScore}% Fresh
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-1">Origin: <span className="font-medium">{product.origin}</span></p>
                <p className="text-xs text-gray-500 font-mono">NFT ID: {product.nftId}</p>
              </div>
              {/* Scan Feature */}
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={handleScan}
                  disabled={scanning}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
                >
                  {scanning ? 'Scanning...' : 'Scan Product'}
                </button>
                {scanResult && (
                  <div className="mt-4 text-center text-gray-700">
                    <strong>Scan Result:</strong> {scanResult}
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            {product.timeline && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Supply Chain Journey</h3>
                <div className="space-y-4">
                  {product.timeline.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <div className={step.completed ? 'text-green-600' : 'text-gray-400'}>
                          {renderIcon(step.icon)}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;