import { ChevronLeft, Share, MoreHorizontal, LeafyGreen, Truck, Package, Store } from 'lucide-react';

const ProductDetail = ({ product, onBack }) => {
  if (!product) return null;
  
  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'LeafyGreen': return <LeafyGreen className="w-4 h-4" />;
      case 'Truck': return <Truck className="w-4 h-4" />;
      case 'Package': return <Package className="w-4 h-4" />;
      case 'Store': return <Store className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col">
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={onBack}
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
      
      <div className="px-6 py-6 overflow-y-auto flex-1">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
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
        </div>
        
        {product.timeline && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Supply Chain Journey</h3>
              <div className="space-y-4">
                {product.timeline.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {renderIcon(step.icon)}
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

export default ProductDetail;