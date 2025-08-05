const ProductCard = ({ product, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
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
);

export default ProductCard;