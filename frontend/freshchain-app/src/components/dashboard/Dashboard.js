import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards';
import ProductList from './ProductList';
import StatusBar from '../common/StatusBar';

const Dashboard = ({ userAddress, truncateAddress, products, onSearch, onViewProduct }) => (
  <div className="bg-gray-50 h-full flex flex-col">
    <StatusBar />
    <DashboardHeader 
      userAddress={userAddress}
      truncateAddress={truncateAddress}
      onSearch={onSearch}
    />
    <div className="flex-1 overflow-y-auto">
      <StatsCards />
      <ProductList products={products} onViewProduct={onViewProduct} />
    </div>
  </div>
);

export default Dashboard;