import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import PropTypes from 'prop-types';
import './QRScanner.css';

const QRScanner = ({ onScan, onError, isActive = true }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualRegNo, setManualRegNo] = useState('');
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

      const qrCodeScanner = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = qrCodeScanner;
      isInitializedRef.current = true;

      // Try multiple camera configurations for better compatibility
      const cameraConfigs = [
        { facingMode: 'environment' }, // Back camera (preferred)
        { facingMode: { exact: 'environment' } }, // Exact back camera
        { facingMode: 'user' }, // Front camera fallback
        'environment', // String format for older devices
        undefined, // Let browser choose default camera
      ];

      let cameraStarted = false;
      let lastError = null;

      for (const config of cameraConfigs) {
        try {
          console.log('Trying camera config:', config);
          
          await qrCodeScanner.start(
            config,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
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

          cameraStarted = true;
          setCameraPermission('granted');
          setIsScanning(true);
          console.log('Camera started successfully with config:', config);
          break;
        } catch (err) {
          lastError = err;
          console.warn('Failed with config:', config, err.message);
          // Continue to next config
        }
      }

      if (!cameraStarted) {
        throw lastError || new Error('Unable to start camera with any configuration');
      }

    } catch (err) {
      console.error('Scanner error:', err);
      setCameraPermission('denied');
      
      // Provide helpful error message
      let errorMessage = 'Failed to start camera. ';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += 'Please allow camera access.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera found on device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += 'Camera is in use by another app.';
      } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
        errorMessage += 'Camera constraints not supported.';
      } else if (err.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported on this browser.';
      } else if (err.name === 'SecurityError') {
        errorMessage += 'Secure context required (HTTPS).';
      } else {
        errorMessage += err.message || 'Unknown error.';
      }
      
      onError(errorMessage);
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

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualRegNo.trim()) {
      onScan(manualRegNo.trim());
      setManualRegNo('');
      setShowManualInput(false);
    }
  };

  return (
    <div className="qr-scanner-container">
      {cameraPermission === 'denied' && (
        <div className="camera-error">
          <p>📷 Camera Access Issue</p>
          <p className="error-hint">
            Unable to access camera. This could be due to:
          </p>
          <ul className="error-list">
            <li>Camera permission not granted</li>
            <li>Camera in use by another app</li>
            <li>Browser doesn't support camera access</li>
            <li>Using HTTP instead of HTTPS</li>
          </ul>
          <button 
            className="manual-input-btn"
            onClick={() => setShowManualInput(true)}
          >
            Enter Registration Number Manually
          </button>
        </div>
      )}
      
      {showManualInput && (
        <div className="manual-input-overlay">
          <div className="manual-input-card">
            <h3>Manual Entry</h3>
            <p>Enter the registration number from the QR code</p>
            <form onSubmit={handleManualSubmit}>
              <input
                type="text"
                value={manualRegNo}
                onChange={(e) => setManualRegNo(e.target.value.toUpperCase())}
                placeholder="e.g., CS23B1021"
                className="manual-input-field"
                autoFocus
                pattern="[A-Z0-9]+"
                required
              />
              <div className="manual-input-buttons">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowManualInput(false);
                    setManualRegNo('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
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
          <button 
            className="manual-entry-link"
            onClick={() => setShowManualInput(true)}
          >
            Can't scan? Enter manually
          </button>
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
