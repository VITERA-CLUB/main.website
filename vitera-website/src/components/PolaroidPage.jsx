import { useState } from 'react';
import QRScanner from './QRScanner';
import './PolaroidPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_ENDPOINT = '/api/qr';

const PolaroidPage = () => {
  const [scanning, setScanning] = useState(true);
  const [team, setTeam] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [merged, setMerged] = useState(false);
  const [mergeInfo, setMergeInfo] = useState(null);
  const [scannedRegNo, setScannedRegNo] = useState(''); // Store the scanned regNo

  const handleScan = async (regNo) => {
    setScanning(false);
    setLoading(true);
    setError('');
    setCompleted(false);
    setScannedRegNo(regNo); // Store the scanned regNo

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
        setMerged(data.merged || false);
        setMergeInfo(data.mergeInfo || null);
      } else {
        setEligible(false);
        setMerged(data.merged || false);
        setMergeInfo(data.mergeInfo || null);
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
        return `❌ Polaroid already used${usedTime ? ` on ${new Date(usedTime).toLocaleString()}` : ''}`;
      default:
        return `❌ ${reason}`;
    }
  };

  const handleCompletePolaroid = async (teamRowID, teamNumber) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINT}/polaroid/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamRowID,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Fetch fresh data from server to update UI
        const checkResponse = await fetch(`${API_URL}${API_ENDPOINT}/polaroid/check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ regNo: scannedRegNo }),
        });
        
        const freshData = await checkResponse.json();
        
        // Update ALL states with fresh data
        if (freshData.eligible) {
          setEligible(true);
          setTeam(freshData.team);
          setMerged(freshData.merged || false);
          setMergeInfo(freshData.mergeInfo || null);
        } else {
          // If no longer eligible (all passes used), show the not eligible state
          setEligible(false);
          setMerged(freshData.merged || false);
          setMergeInfo(freshData.mergeInfo || null);
          setError(getErrorMessage(freshData.reason, freshData.usedTime));
          // Auto reset after showing the message
          setTimeout(() => {
            resetScanner();
          }, 4000);
        }
        
        alert(`✓ Team #${teamNumber} polaroid completed! ${data.remainingCount || 0} passes remaining.`);
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
    setMerged(false);
    setMergeInfo(null);
    setScannedRegNo(''); // Reset scanned regNo
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
          <>
            <div className="alert alert-error">
              <p>{error}</p>
            </div>
            
            {/* Show merge info even when not eligible */}
            {!eligible && merged && mergeInfo && (
              <div className="polaroid-details">
                <div className="pass-card">
                  <div className="merge-badge" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    margin: '20px 0',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.5)',
                    textAlign: 'center'
                  }}>
                    🔗 MERGED TEAM #{mergeInfo.mergedTeamID}
                  </div>
                  
                  <div className="merged-teams-container" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    margin: '20px 0'
                  }}>
                    <h3 style={{ 
                      marginTop: 0, 
                      marginBottom: '20px',
                      color: 'var(--primary)',
                      fontSize: '1.3rem',
                      textAlign: 'center'
                    }}>Team Details:</h3>
                    {mergeInfo.teams.map((t) => {
                      const passType = parseInt(t.polaroidPassType || '0');
                      const usedCount = t.polaroidPassUsed || 0;
                      const remainingCount = passType - usedCount;
                      
                      return (
                        <div key={t.teamRowID} style={{
                          background: t.teamRowID === mergeInfo.originalTeamRowID 
                            ? 'rgba(34, 197, 94, 0.1)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: t.teamRowID === mergeInfo.originalTeamRowID 
                            ? '2px solid #22c55e' 
                            : '2px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          padding: '16px',
                          margin: '12px 0'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div>
                              <strong style={{ fontSize: '1.2rem', color: 'var(--text)' }}>Team #{t.teamRowID}</strong>
                              <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>({t.teamSize} members)</span>
                              {t.teamRowID === mergeInfo.originalTeamRowID && (
                                <span style={{ 
                                  marginLeft: '12px', 
                                  background: '#22c55e',
                                  color: 'white', 
                                  padding: '4px 12px', 
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold'
                                }}>
                                  ← SCANNED
                                </span>
                              )}
                            </div>
                            <div>
                              {t.polaroidApplied ? (
                                remainingCount > 0 ? (
                                  <span style={{ 
                                    color: '#22c55e', 
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    padding: '6px 12px',
                                    borderRadius: '8px'
                                  }}>✓ {remainingCount} Left</span>
                                ) : (
                                  <span style={{ 
                                    color: '#dc2626', 
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem',
                                    background: 'rgba(220, 38, 38, 0.1)',
                                    padding: '6px 12px',
                                    borderRadius: '8px'
                                  }}>🚫 All Used</span>
                                )
                              ) : (
                                <span style={{ 
                                  color: '#999',
                                  fontSize: '0.95rem',
                                  background: 'rgba(153, 153, 153, 0.1)',
                                  padding: '6px 12px',
                                  borderRadius: '8px'
                                }}>✗ N/A</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Pass count display */}
                          {t.polaroidApplied && (
                            <div style={{
                              background: remainingCount > 0 
                                ? 'rgba(34, 197, 94, 0.1)' 
                                : 'rgba(220, 38, 38, 0.1)',
                              border: remainingCount > 0 ? '2px solid #22c55e' : '2px solid #dc2626',
                              borderRadius: '10px',
                              padding: '12px 16px',
                              marginBottom: '12px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <div>
                                <div style={{ 
                                  fontSize: '1.1rem', 
                                  fontWeight: 'bold',
                                  color: 'var(--text)',
                                  marginBottom: '4px'
                                }}>
                                  🎫 {passType}-Pass
                                </div>
                                <div style={{ 
                                  fontSize: '0.9rem', 
                                  color: 'var(--text-secondary)',
                                  fontFamily: 'monospace'
                                }}>
                                  Used: <strong style={{ color: remainingCount > 0 ? '#22c55e' : '#dc2626' }}>{usedCount}</strong> / {passType}
                                </div>
                              </div>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <div style={{
                                  fontSize: '2.5rem',
                                  fontWeight: 'bold',
                                  color: remainingCount > 0 ? '#22c55e' : '#dc2626',
                                  lineHeight: '1'
                                }}>
                                  {remainingCount}
                                </div>
                                <div style={{
                                  fontSize: '0.85rem',
                                  color: 'var(--text-secondary)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '1px'
                                }}>
                                  Left
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div style={{ 
                            fontSize: '0.9rem', 
                            marginBottom: '12px', 
                            color: 'var(--text-secondary)',
                            padding: '8px 0',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            <strong style={{ color: 'var(--text)', marginBottom: '8px', display: 'block' }}>Members:</strong>
                            {t.members.map((member, idx) => (
                              <div key={idx} style={{ 
                                padding: '4px 0',
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}>
                                <span>👤 {member.name}</span>
                                <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{member.regNo}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <button className="reset-btn" onClick={resetScanner} style={{ marginTop: '1rem' }}>
                    Scan Another Team
                  </button>
                </div>
              </div>
            )}
            
            {/* Scan another button for non-merged teams or when no merge info */}
            {!scanning && error && (!merged || !mergeInfo) && (
              <button className="reset-btn" onClick={resetScanner} style={{ marginTop: '1rem' }}>
                Scan Another Team
              </button>
            )}
          </>
        )}

        {eligible && team && !completed && !scanning && (
          <div className="polaroid-details">
            <div className="pass-card">
              <div className="pass-icon">📷</div>
              <h2>✓ Eligible for Polaroid</h2>
              
              {merged && mergeInfo ? (
                <>
                  <div className="merge-badge" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    margin: '20px 0',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.5)',
                    animation: 'pulse 2s ease-in-out infinite',
                    textAlign: 'center'
                  }}>
                    🔗 MERGED TEAM #{mergeInfo.mergedTeamID}
                  </div>
                  
                  <div className="merged-teams-container" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    margin: '20px 0'
                  }}>
                    <h3 style={{ 
                      marginTop: 0, 
                      marginBottom: '20px',
                      color: 'var(--primary)',
                      fontSize: '1.3rem',
                      textAlign: 'center'
                    }}>Includes Teams:</h3>
                    {mergeInfo.teams.map((t) => {
                      const passType = parseInt(t.polaroidPassType || '0');
                      const usedCount = t.polaroidPassUsed || 0;
                      const remainingCount = passType - usedCount;
                      const hasRemainingPasses = t.polaroidApplied && remainingCount > 0;
                      
                      return (
                        <div key={t.teamRowID} style={{
                          background: t.teamRowID === mergeInfo.originalTeamRowID 
                            ? 'rgba(34, 197, 94, 0.1)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: t.teamRowID === mergeInfo.originalTeamRowID 
                            ? '2px solid #22c55e' 
                            : '2px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          padding: '16px',
                          margin: '12px 0',
                          transition: 'all 0.3s ease'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div>
                              <strong style={{ fontSize: '1.2rem', color: 'var(--text)' }}>Team #{t.teamRowID}</strong>
                              <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>({t.teamSize} members)</span>
                              {t.teamRowID === mergeInfo.originalTeamRowID && (
                                <span style={{ 
                                  marginLeft: '12px', 
                                  background: '#22c55e',
                                  color: 'white', 
                                  padding: '4px 12px', 
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold'
                                }}>
                                  ← SCANNED
                                </span>
                              )}
                            </div>
                            <div>
                              {t.polaroidApplied ? (
                                remainingCount > 0 ? (
                                  <span style={{ 
                                    color: '#22c55e', 
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    padding: '6px 12px',
                                    borderRadius: '8px'
                                  }}>✓ Active</span>
                                ) : (
                                  <span style={{ 
                                    color: '#dc2626', 
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem',
                                    background: 'rgba(220, 38, 38, 0.1)',
                                    padding: '6px 12px',
                                    borderRadius: '8px'
                                  }}>🚫 Full</span>
                                )
                              ) : (
                                <span style={{ 
                                  color: '#999',
                                  fontSize: '0.95rem',
                                  background: 'rgba(153, 153, 153, 0.1)',
                                  padding: '6px 12px',
                                  borderRadius: '8px'
                                }}>✗ N/A</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Pass count display */}
                          {t.polaroidApplied && (
                            <div style={{
                              background: remainingCount > 0 
                                ? 'rgba(34, 197, 94, 0.1)' 
                                : 'rgba(220, 38, 38, 0.1)',
                              border: remainingCount > 0 ? '2px solid #22c55e' : '2px solid #dc2626',
                              borderRadius: '10px',
                              padding: '12px 16px',
                              marginBottom: '12px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <div>
                                <div style={{ 
                                  fontSize: '1.1rem', 
                                  fontWeight: 'bold',
                                  color: 'var(--text)',
                                  marginBottom: '4px'
                                }}>
                                  🎫 {passType}-Pass
                                </div>
                                <div style={{ 
                                  fontSize: '0.9rem', 
                                  color: 'var(--text-secondary)',
                                  fontFamily: 'monospace'
                                }}>
                                  Used: <strong style={{ color: remainingCount > 0 ? '#22c55e' : '#dc2626' }}>{usedCount}</strong> / {passType}
                                </div>
                              </div>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <div style={{
                                  fontSize: '2.5rem',
                                  fontWeight: 'bold',
                                  color: remainingCount > 0 ? '#22c55e' : '#dc2626',
                                  lineHeight: '1'
                                }}>
                                  {remainingCount}
                                </div>
                                <div style={{
                                  fontSize: '0.85rem',
                                  color: 'var(--text-secondary)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '1px'
                                }}>
                                  Left
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div style={{ 
                            fontSize: '0.9rem', 
                            marginBottom: '12px', 
                            color: 'var(--text-secondary)',
                            padding: '8px 0',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            {t.members.map((m, i) => (
                              <span key={i} style={{ marginRight: '8px' }}>
                                👤 {m.name} <span style={{ color: '#999', fontSize: '0.85rem' }}>({m.regNo})</span>
                                {i < t.members.length - 1 && ' • '}
                              </span>
                            ))}
                          </div>
                          
                          {/* Individual complete button for each team */}
                          {hasRemainingPasses && (
                            <button
                              style={{
                                width: '100%',
                                padding: '14px',
                                background: loading 
                                  ? 'linear-gradient(135deg, #999 0%, #666 100%)'
                                  : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: loading 
                                  ? 'none'
                                  : '0 6px 20px rgba(255, 107, 53, 0.4)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                transform: loading ? 'none' : 'translateY(0)',
                              }}
                              onMouseOver={(e) => {
                                if (!loading) {
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.6)';
                                }
                              }}
                              onMouseOut={(e) => {
                                if (!loading) {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                                }
                              }}
                              onClick={() => handleCompletePolaroid(t.teamRowID, t.teamRowID)}
                              disabled={loading}
                            >
                              {loading ? '⏳ Processing...' : `✓ Complete Team #${t.teamRowID}`}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0.08) 100%)',
                    border: '2px solid #2196F3',
                    borderRadius: '12px',
                    padding: '16px',
                    margin: '20px 0',
                    textAlign: 'center',
                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: 'bold', 
                      color: '#64B5F6',
                      fontSize: '1.05rem',
                      letterSpacing: '0.5px'
                    }}>
                      📌 This member belongs to Team #{team.teamRowID}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="team-info">
                    <p className="team-id">Team #{team.teamRowID}</p>
                    <p className="team-members">{team.teamSize} Member{team.teamSize > 1 ? 's' : ''}</p>
                  </div>
                  
                  {/* Pass count display for non-merged teams */}
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '2px solid #22c55e',
                    borderRadius: '12px',
                    padding: '20px',
                    margin: '20px 0'
                  }}>
                    <h3 style={{ 
                      margin: '0 0 16px 0',
                      color: '#22c55e',
                      fontSize: '1.3rem',
                      textAlign: 'center'
                    }}>🎫 Polaroid Pass</h3>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: 'rgba(0, 0, 0, 0.2)',
                      padding: '16px',
                      borderRadius: '10px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          margin: '8px 0', 
                          fontSize: '1.1rem',
                          color: 'var(--text)' 
                        }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Type:</span> <strong style={{ color: '#22c55e' }}>{team.passType || 'N/A'}</strong>
                        </p>
                        <p style={{ 
                          margin: '8px 0',
                          fontSize: '1.1rem',
                          color: 'var(--text)',
                          fontFamily: 'monospace'
                        }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Used:</span> <strong style={{ color: '#22c55e' }}>{team.usedCount || 0}</strong> / {team.passTypeRaw || 0}
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '0 20px'
                      }}>
                        <div style={{
                          fontSize: '3rem',
                          fontWeight: 'bold',
                          color: '#22c55e',
                          lineHeight: '1'
                        }}>
                          {team.remainingCount || 0}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          textTransform: 'uppercase',
                          letterSpacing: '1.5px',
                          marginTop: '4px'
                        }}>
                          Left
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    className="complete-btn"
                    onClick={() => handleCompletePolaroid(team.teamRowID, team.teamRowID)}
                    disabled={loading}
                    style={{
                      background: loading 
                        ? '#999'
                        : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                      boxShadow: loading 
                        ? 'none'
                        : '0 8px 24px rgba(255, 107, 53, 0.5)'
                    }}
                  >
                    {loading ? '⏳ Processing...' : '✓ Mark as Completed'}
                  </button>
                </>
              )}
              
              <button className="reset-btn" onClick={resetScanner} style={{ marginTop: '1.5rem' }}>
                Scan Another Team
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
