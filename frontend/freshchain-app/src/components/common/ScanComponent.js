import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner'; // Changed 'QrScanner' to 'Scanner'

const ScanComponent = ({ onScanSuccess }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (result) {
      // Pass the scanned data up to the parent component
      onScanSuccess(result);
    }
  }, [result, onScanSuccess]);

  const handleDecode = (result) => {
    if (result) {
      setResult(result);
      console.log("Scanned:", result);
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner error:', err);
    setError(err.message);
  };

  return (
    <div className="scanner-container flex flex-col items-center justify-center h-full p-4">
      <h2 className="text-xl font-bold mb-4">Scan Product QR Code</h2>
      <div className="w-full max-w-xs aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
        <Scanner // Changed 'QrScanner' to 'Scanner'
          onDecode={handleDecode}
          onError={handleError}
          containerStyle={{ width: '100%' }}
          videoStyle={{ width: '100%', height: '100%' }}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <p className="mt-4 text-gray-600">
        {result ? `Scanning successful: ${result}` : "Point your camera at a QR code."}
      </p>
    </div>
  );
};

export default ScanComponent;