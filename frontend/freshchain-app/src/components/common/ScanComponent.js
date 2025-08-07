import React, { useState, useEffect } from 'react';

const ScanComponent = ({ onScanSuccess, onBack }) => {
  const [manualCode, setManualCode] = useState('');
  const [scanStatus, setScanStatus] = useState('Ready to scan or enter ID...');

  useEffect(() => {
    setScanStatus('Scanning for QR code...');
  }, []);

  const handleManualScan = () => {
    if (manualCode.trim()) {
      setScanStatus(`Simulating scan for ID: ${manualCode.trim()}`);
      onScanSuccess(manualCode.trim());
    } else {
      setScanStatus('Please enter an NFT ID.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white h-full relative">
      {/* Go Back Button */}
      {onBack && (
        <button
          className="absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 font-semibold shadow transition"
          onClick={onBack}
        >
          &larr; Back
        </button>
      )}

      <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-4">Scan Product</h3>
      <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-center mb-6 shadow-inner">
        <p>
          [Camera Feed / Scanner UI Placeholder]
          <br />
          {scanStatus}
        </p>
      </div>
      <div className="w-full max-w-xs">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Enter NFT ID manually (e.g., 1, 2)"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
        />
        <button
          className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          onClick={handleManualScan}
        >
          Simulate Scan
        </button>
      </div>
    </div>
  );
};

export default ScanComponent;