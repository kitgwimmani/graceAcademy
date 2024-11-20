import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleScan = data => {
    setBarcode(data);
    setScanning(false); // Stop scanning after successful scan
  };

  const handleError = err => {
    console.error(err);
    setScanning(false); // Stop scanning on error
  };

  const handleGetBarcode = () => {
    setScanning(true); // Start scanning when the button is clicked
  };

  return (
    <div>
      {scanning && (
        <BarcodeReader
          onError={handleError}
          onScan={handleScan}
          facingMode="environment"
        />
      )}
      <button className='btn btn-warning btn-sm' onClick={handleGetBarcode}>
        Scan Barcode
      </button>
      {barcode && <p>Scanned Barcode: {barcode}</p>}
    </div>
  );
};

export default BarcodeScanner;
