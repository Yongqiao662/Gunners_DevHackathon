import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards';
import ProductList from './ProductList';
import StatusBar from '../common/StatusBar';
import { useState, useMemo } from 'react';

const Dashboard = ({ userAddress, truncateAddress, products, onSearch, onViewProduct, disconnectWallet, onShowSearch }) => {
    const [filter, setFilter] = useState({ freshness: '', status: '', origin: '' });

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (filter.freshness === '>85' && !(product.freshnessScore > 85)) return false;
            if (filter.freshness === '>70' && !(product.freshnessScore > 70 && product.freshnessScore <= 85)) return false;
            if (filter.freshness === '<=70' && !(product.freshnessScore <= 70)) return false;
            if (filter.status && product.status !== filter.status) return false;
            if (filter.origin && !product.origin.toLowerCase().includes(filter.origin.toLowerCase())) return false;
            return true;
        });
    }, [products, filter]);

    return (
        <div className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 h-full flex flex-col shadow-lg rounded-3xl">
            <StatusBar />
            <div className="sticky top-0 z-20">
                <DashboardHeader
                    userAddress={userAddress}
                    truncateAddress={truncateAddress}
                    onSearch={onSearch}
                    disconnectWallet={disconnectWallet}
                    onFilter={setFilter}
                />
            </div>
            <div className="flex-1 overflow-y-auto pt-1 pb-4">
                <StatsCards onShowSearch={onShowSearch} />
                <ProductList products={filteredProducts} onViewProduct={onViewProduct} />
            </div>
        </div>
    );
};

export default Dashboard;