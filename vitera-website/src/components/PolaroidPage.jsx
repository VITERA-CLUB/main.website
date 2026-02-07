import { useState } from 'react';
import QRScanner from './QRScanner';
import './PolaroidPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Use mock API for testing (change to /api/qr when Google Sheets is configured)
const USE_MOCK = false;
const API_ENDPOINT = USE_MOCK ? '/api/qr-mock' : '/api/qr';

const PolaroidPage = () => {
  const [scanning, setScanning] = useState(true);
  const [team, setTeam] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleScan = async (regNo) => {
    setScanning(false);
    setLoading(true);
    setError('');
    setCompleted(false);

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINT}/polaroid/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regNo }),
      });

      const data = await response.json();

      if (data.eligible) {
        setEligible(true);
        setTeam(data.team);
      } else {
        setEligible(false);
        setError(getErrorMessage(data.reason, data.usedTime));
        setTimeout(() => {
          resetScanner();
        }, 4000);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to check eligibility. Please try again.');
      setTimeout(() => {
        resetScanner();
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (reason, usedTime) => {
    switch (reason) {
      case 'Team not found':
        return '❌ Team not found in registration database';
      case 'Polaroid not applied':
        return '❌ This team has not applied for Polaroid';
      case 'Polaroid already used':
        return `❌ Polaroid already used on ${new Date(usedTime).toLocaleString()}`;
      default:
        return `❌ ${reason}`;
    }
  };

  const handleCompletePolaroid = async () => {
    if (!team) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINT}/polaroid/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamRowID: team.teamRowID,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCompleted(true);
        setError('');
      } else {
        setError(data.message || 'Failed to complete Polaroid');
      }
    } catch (err) {
      console.error('Complete error:', err);
      setError('Failed to complete Polaroid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleScanError = (errorMessage) => {
    setError(errorMessage);
  };

  const resetScanner = () => {
    setTeam(null);
    setEligible(false);
    setScanning(true);
    setError('');
    setCompleted(false);
  };

  const getPassTypeIcon = (passType) => {
    switch (passType.toLowerCase()) {
      case 'single':
        return '👤';
      case 'duo':
        return '👥';
      case 'group':
        return '👨‍👩‍👧‍👦';
      default:
        return '📷';
    }
  };

  return (
    <div className="polaroid-page">
      <div className="polaroid-container">
        {USE_MOCK && (
          <div className="alert" style={{
            background: 'rgba(255, 140, 0, 0.1)', 
            border: '2px solid var(--secondary)',
            color: 'var(--secondary)',
            marginBottom: '1rem'
          }}>
            <span className="alert-icon">⚠️</span>
            <p>
              <strong>TESTING MODE</strong> - Using mock data. 
              Set USE_MOCK = false in PolaroidPage.jsx when Google Sheets is configured.
            </p>
          </div>
        )}
        
        <h1 className="polaroid-title">
          Polaroid <span className="highlight">Booth</span>
        </h1>
        <p className="polaroid-subtitle">Scan QR code to verify Polaroid pass</p>

        {scanning && (
          <div className="scanner-section">
            <QRScanner
              onScan={handleScan}
              onError={handleScanError}
              isActive={scanning}
            />
          </div>
        )}

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Checking eligibility...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <p>{error}</p>
          </div>
        )}

        {eligible && team && !completed && !scanning && (
          <div className="polaroid-details">
            <div className="pass-card">
              <div className="pass-icon">
                {getPassTypeIcon(team.passType)}
              </div>
              <h2>✓ Eligible for Polaroid</h2>
              <div className="pass-type-badge">
                {team.passType} Pass
              </div>
              <div className="team-info">
                <p className="team-id">Team #{team.teamRowID}</p>
                <p className="team-members">{team.teamSize} Member{team.teamSize > 1 ? 's' : ''}</p>
              </div>

              <div className="pass-instructions">
                <h3>Pass Type: {team.passType}</h3>
                <ul>
                  {team.passType === 'Single' && (
                    <li>📸 One solo photo allowed</li>
                  )}
                  {team.passType === 'Duo' && (
                    <>
                      <li>📸 Photo for 2 people</li>
                      <li>💑 Pairs or friends</li>
                    </>
                  )}
                  {team.passType === 'Group' && (
                    <>
                      <li>📸 Group photo allowed</li>
                      <li>👨‍👩‍👧‍👦 3-4 people</li>
                    </>
                  )}
                </ul>
              </div>

              <button
                className="complete-btn"
                onClick={handleCompletePolaroid}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        )}

        {completed && (
          <div className="completion-card">
            <div className="success-icon">🎉</div>
            <h2>Polaroid Completed!</h2>
            <p>Team #{team?.teamRowID} has successfully used their Polaroid pass</p>
            <p className="completion-time">
              Completed at {new Date().toLocaleTimeString()}
            </p>
            <button className="reset-btn" onClick={resetScanner}>
              Scan Next Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolaroidPage;
