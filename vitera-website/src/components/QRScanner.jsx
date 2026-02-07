import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import PropTypes from 'prop-types';
import './QRScanner.css';

const QRScanner = ({ onScan, onError, isActive = true }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const html5QrCodeRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in StrictMode
    if (isInitializedRef.current) return;
    
    if (!isActive) {
      stopScanner();
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      startScanner();
    }, 100);

    return () => {
      clearTimeout(timer);
      stopScanner();
      isInitializedRef.current = false;
    };
  }, [isActive]);

  const startScanner = async () => {
    // Prevent multiple instances
    if (html5QrCodeRef.current) {
      console.log('Scanner already running');
      return;
    }

    try {
      // Check if element exists
      const element = document.getElementById('qr-reader');
      if (!element) {
        console.error('QR reader element not found');
        return;
      }

      // Check camera permission first
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission('granted');

      const qrCodeScanner = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = qrCodeScanner;
      isInitializedRef.current = true;

      await qrCodeScanner.start(
        { facingMode: 'environment' }, // Use back camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // Extract RegNo from QR code
          const match = decodedText.match(/REG_NO=(.+)/);
          if (match) {
            const regNo = match[1].trim();
            onScan(regNo);
          } else {
            onError('Invalid QR code format');
          }
        },
        () => {
          // Ignore scan errors (happens frequently during scanning)
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Scanner error:', err);
      setCameraPermission('denied');
      onError(err.message || 'Failed to start camera');
      html5QrCodeRef.current = null;
      isInitializedRef.current = false;
    }
  };

  const stopScanner = async () => {
    try {
      if (html5QrCodeRef.current) {
        const scanner = html5QrCodeRef.current;
        if (scanner.isScanning) {
          await scanner.stop();
        }
        scanner.clear();
        html5QrCodeRef.current = null;
      }
      setIsScanning(false);
    } catch (err) {
      console.error('Error stopping scanner:', err);
      html5QrCodeRef.current = null;
    }
  };

  return (
    <div className="qr-scanner-container">
      {cameraPermission === 'denied' && (
        <div className="camera-error">
          <p>📷 Camera permission denied</p>
          <p className="error-hint">
            Please enable camera access in your browser settings
          </p>
        </div>
      )}
      
      <div id="qr-reader" className="qr-reader"></div>
      
      {isScanning && (
        <div className="scanner-overlay">
          <div className="scan-box">
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>
          </div>
          <p className="scan-instruction">Align QR code within the frame</p>
        </div>
      )}
    </div>
  );
};

QRScanner.propTypes = {
  onScan: PropTypes.func.isRequired,
  onError: PropTypes.func,
  isActive: PropTypes.bool,
};

QRScanner.defaultProps = {
  onError: () => {},
  isActive: true,
};

export default QRScanner;
