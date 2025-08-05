import ProductCard from './ProductCard';

const ProductList = ({ products, onViewProduct }) => (
  <div className="px-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-gray-900">Recent Shipments</h3>
      <button className="text-emerald-600 font-medium text-sm">View All</button>
    </div>
    <div className="space-y-3">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onViewProduct(product)}
        />
      ))}
    </div>
  </div>
);

export default ProductList;