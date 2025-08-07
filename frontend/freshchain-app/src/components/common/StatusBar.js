import { Signal, Wifi, BatteryCharging } from 'lucide-react';

const StatusBar = () => (
  <div className="flex justify-between items-center text-gray-800 text-sm font-semibold px-6 py-3 bg-gradient-to-br from-teal-100 via-white to-emerald-100 bg-opacity-50 backdrop-blur-md px-2 py-2 border-b border-gray-100 shadow-md">
    <span>9:41</span>
    <div className="flex items-center space-x-1">
      <Signal className="w-4 h-4" />
      <Wifi className="w-4 h-4" />
      <BatteryCharging className="w-4 h-4" />
    </div>
  </div>
);

export default StatusBar;