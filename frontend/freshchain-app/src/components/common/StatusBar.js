import { Signal, Wifi, BatteryCharging } from 'lucide-react';

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

export default StatusBar;