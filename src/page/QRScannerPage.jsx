import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState, useRef } from 'react';

export const QRScannerPage = () => {
  const [isEnabled, setEnabled] = useState(false);
  const [qrMessage, setQrMessage] = useState("");
  const [qrError, setQrError] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      disableFlip: false,
    };

    const qrCodeSuccess = (text) => {      
      setQrMessage(text);
      setQrError("");
      setEnabled(false);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };

    const qrCodeError = (errorMessage) => {
      setQrError(errorMessage);
    };

    if (isEnabled) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner("qrCodeContainer", config, false);
      }
      scannerRef.current.render(qrCodeSuccess, qrCodeError);
    } else if (scannerRef.current) {
      scannerRef.current.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };
  }, [isEnabled]);

  return (
    <div className="scanner">
      <div id="qrCodeContainer"></div>
      {qrMessage && !qrError && <div className="qr-message">{qrMessage}</div>}
      {!qrMessage && qrError && <div className="qr-message">{qrError}</div>}
      <button className="start-button" onClick={() => setEnabled(!isEnabled)}>
        {isEnabled ? "Off" : "On"}
      </button>
    </div>
  );
};