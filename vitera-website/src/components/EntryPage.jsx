import { useState } from 'react';
import QRScanner from './QRScanner';
import './EntryPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_ENDPOINT = '/api/qr';

const EntryPage = () => {
  const [scanning, setScanning] = useState(true);
  const [team, setTeam] = useState(null);
  const [merged, setMerged] = useState(false);
  const [mergeInfo, setMergeInfo] = useState(null);
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
        setMerged(data.merged || false);
        setMergeInfo(data.mergeInfo || null);
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

  const handleMarkEntry = async (teamRowID, memberIndex, memberName) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINT}/entry/mark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamRowID,
          memberIndex,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state for both team and mergeInfo
        if (merged && mergeInfo) {
          // Update mergeInfo state
          setMergeInfo((prev) => ({
            ...prev,
            teams: prev.teams.map((t) =>
              t.teamRowID === teamRowID
                ? {
                    ...t,
                    members: t.members.map((m, idx) =>
                      idx + 1 === memberIndex ? { ...m, entered: true } : m
                    ),
                  }
                : t
            ),
          }));
        }
        
        // Update team state if it's the current team
        if (team.teamRowID === teamRowID) {
          setTeam((prev) => ({
            ...prev,
            members: prev.members.map((m) =>
              m.index === memberIndex ? { ...m, entered: true } : m
            ),
          }));
        }
        
        setSuccess(`${memberName} marked as entered ✓`);
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
    setMerged(false);
    setMergeInfo(null);
    setScanning(true);
    setError('');
    setSuccess('');
  };

  // Check if all members are entered (including merged teams)
  const allEntered = merged && mergeInfo
    ? mergeInfo.teams.every((t) => t.members.every((m) => m.entered))
    : team?.members.every((m) => m.entered);

  return (
    <div className="entry-page">
      <div className="entry-container">
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
            {merged && mergeInfo && (
              <div className="merged-team-info" style={{
                background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.15))',
                border: '2px solid var(--accent)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, var(--purple), var(--accent))',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    MERGED TEAM
                  </span>
                  <span style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: 'var(--text)'
                  }}>
                    Team #{mergeInfo.mergedTeamID}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {mergeInfo.teams.map((mergedTeam) => (
                    <div
                      key={mergedTeam.teamRowID}
                      style={{
                        background: mergedTeam.teamRowID === mergeInfo.originalTeamRowID 
                          ? 'rgba(0, 255, 127, 0.1)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: mergedTeam.teamRowID === mergeInfo.originalTeamRowID
                          ? '2px solid #00FF7F'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '1rem'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontWeight: '600',
                          color: 'var(--text)',
                          fontSize: '1rem'
                        }}>
                          Team #{mergedTeam.teamRowID}
                        </span>
                        {mergedTeam.teamRowID === mergeInfo.originalTeamRowID && (
                          <span style={{
                            background: '#00FF7F',
                            color: '#000',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            CURRENT
                          </span>
                        )}
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {mergedTeam.members.map((member, idx) => (
                          <div key={idx}>
                            {member.name} ({member.regNo})
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {merged && mergeInfo ? (
              // Show all members from all teams in merge group
              <div>
                {mergeInfo.teams.map((mergedTeam) => (
                  <div key={mergedTeam.teamRowID} style={{ marginBottom: '1.5rem' }}>
                    <div className="team-header" style={{
                      background: mergedTeam.teamRowID === mergeInfo.originalTeamRowID 
                        ? 'rgba(0, 255, 127, 0.05)' 
                        : 'transparent',
                      borderLeft: mergedTeam.teamRowID === mergeInfo.originalTeamRowID
                        ? '4px solid #00FF7F'
                        : '4px solid rgba(255, 255, 255, 0.1)',
                      paddingLeft: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      <h2>Team #{mergedTeam.teamRowID}</h2>
                      <span className="team-size-badge">{mergedTeam.teamSize} Members</span>
                    </div>

                    <div className="members-list">
                      {mergedTeam.members.map((member, idx) => (
                        <div
                          key={`${mergedTeam.teamRowID}-${idx}`}
                          className={`member-card ${member.entered ? 'entered' : ''}`}
                        >
                          <div className="member-info">
                            <div className="member-number">{idx + 1}</div>
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
                              onClick={() => handleMarkEntry(mergedTeam.teamRowID, idx + 1, member.name)}
                              disabled={loading}
                            >
                              Mark Entry
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Show only current team members
              <div>
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
                          onClick={() => handleMarkEntry(team.teamRowID, member.index, member.name)}
                          disabled={loading}
                        >
                          Mark Entry
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
