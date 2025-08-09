import React, { useState, useEffect } from 'react';
import { lucideQrCode, lucideArrowLeft, lucideScan } from 'lucide-react';

// A utility function to parse the token ID, handling both raw numbers and formatted strings.
// It will extract '1000' from 'FC-001000' or just return '123' if that's the input.
const parseTokenId = (input) => {
  const match = input.match(/(\d+)$/);
  if (match) {
    return match[1];
  }
  return '';
};

const ScanComponent = ({ onScanSuccess, onBack }) => {
  const [manualCode, setManualCode] = useState('');
  const [scanStatus, setScanStatus] = useState('Ready to scan or enter ID...');

  // Effect to update the status message on component load
  useEffect(() => {
    setScanStatus('Scanning for QR code...');
  }, []);

  // Handle the manual scan button click.
  // This now uses the new parseTokenId function.
  const handleManualScan = () => {
    const parsedId = parseTokenId(manualCode.trim());
    if (parsedId) {
      setScanStatus(`Simulating scan for ID: ${parsedId}`);
      onScanSuccess(parsedId);
    } else {
      setScanStatus('Please enter a valid NFT ID.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-emerald-100 h-full relative font-inter">
      {/* Go Back Button */}
      {onBack && (
        <button
          className="absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 font-semibold shadow transition flex items-center gap-1"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <span className="hidden sm:inline">Back</span>
        </button>
      )}

      <h3 className="text-3xl font-extrabold text-gray-800 mb-6 mt-4 tracking-tight">Scan a Product</h3>
      <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-emerald-100 via-white to-teal-100 rounded-3xl flex flex-col items-center justify-center text-gray-500 text-center mb-6 shadow-2xl border-4 border-emerald-200 animate-pulse-slow">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-qr-code text-emerald-500 mb-4"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M12 7h2a2 2 0 0 0 2-2V3"/><path d="M3 12h3a2 2 0 0 0 2-2V7"/><path d="M16 16h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M12 16h.01"/><path d="M16 16h.01"/></svg>
        <p className="text-lg font-medium text-gray-700">{scanStatus}</p>
      </div>
      <div className="w-full max-w-xs">
        <input
          type="text"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl mb-4 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all text-center text-lg font-mono tracking-wider"
          placeholder="Enter NFT ID "
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
        />
        <button
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-full font-bold shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all text-xl tracking-wide uppercase flex items-center justify-center gap-2 transform hover:-translate-y-1"
          onClick={handleManualScan}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/><path d="M12 7v10"/></svg>
          Scan
        </button>
      </div>
    </div>
  );
};

export default ScanComponent;