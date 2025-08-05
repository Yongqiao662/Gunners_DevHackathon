import { Package, LeafyGreen, ArrowUpRight } from 'lucide-react';

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

export default StatsCards;