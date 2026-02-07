import { useState } from 'react';
import QRScanner from './QRScanner';
import './EntryPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Use mock API for testing (change to /api/qr when Google Sheets is configured)
const USE_MOCK = false;
const API_ENDPOINT = USE_MOCK ? '/api/qr-mock' : '/api/qr';

const EntryPage = () => {
  const [scanning, setScanning] = useState(true);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleScan = async (regNo) => {
    setScanning(false);
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINT}/entry/fetch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regNo }),
      });

      const data = await response.json();

      if (data.success) {
        setTeam(data.team);
      } else {
        setError(data.message || 'Team not found');
        setTimeout(() => {
          resetScanner();
        }, 3000);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch team data. Please try again.');
      setTimeout(() => {
        resetScanner();
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkEntry = async (memberIndex) => {
    if (!team) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINT}/entry/mark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamRowID: team.teamRowID,
          memberIndex,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setTeam((prev) => ({
          ...prev,
          members: prev.members.map((m) =>
            m.index === memberIndex ? { ...m, entered: true } : m
          ),
        }));
        setSuccess(`Member ${memberIndex} marked as entered ✓`);
      } else {
        setError(data.message || 'Failed to mark entry');
      }
    } catch (err) {
      console.error('Mark entry error:', err);
      setError('Failed to mark entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleScanError = (errorMessage) => {
    setError(errorMessage);
  };

  const resetScanner = () => {
    setTeam(null);
    setScanning(true);
    setError('');
    setSuccess('');
  };

  const allEntered = team?.members.every((m) => m.entered);

  return (
    <div className="entry-page">
      <div className="entry-container">
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
              Set USE_MOCK = false in EntryPage.jsx when Google Sheets is configured.
            </p>
          </div>
        )}
        
        <h1 className="entry-title">
          Event <span className="highlight">Entry</span>
        </h1>
        <p className="entry-subtitle">Scan QR code to mark team entry</p>

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
            <p>Processing...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            <p>{success}</p>
          </div>
        )}

        {team && !scanning && (
          <div className="team-details">
            <div className="team-header">
              <h2>Team #{team.teamRowID}</h2>
              <span className="team-size-badge">{team.teamSize} Members</span>
            </div>

            <div className="members-list">
              {team.members.map((member) => (
                <div
                  key={member.index}
                  className={`member-card ${member.entered ? 'entered' : ''}`}
                >
                  <div className="member-info">
                    <div className="member-number">{member.index}</div>
                    <div className="member-details">
                      <h3>{member.name}</h3>
                      <p className="reg-number">{member.regNo}</p>
                    </div>
                  </div>
                  
                  {member.entered ? (
                    <div className="status-badge entered-badge">
                      ✓ Entered
                    </div>
                  ) : (
                    <button
                      className="mark-entry-btn"
                      onClick={() => handleMarkEntry(member.index)}
                      disabled={loading}
                    >
                      Mark Entry
                    </button>
                  )}
                </div>
              ))}
            </div>

            {allEntered && (
              <div className="all-entered-message">
                <p>🎉 All team members have entered!</p>
              </div>
            )}

            <button className="reset-btn" onClick={resetScanner}>
              Scan Another Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryPage;
