import { useState } from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import './EventTicket.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_ENDPOINT = '/api/qr';

const EventTicket = () => {
  const [regNo, setRegNo] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  const generateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate registration number exists in database
      const response = await fetch(`${API_URL}${API_ENDPOINT}/ticket/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regNo }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || 'Failed to generate ticket');
        setLoading(false);
        return;
      }

      // Generate QR Code with registration number
      const qrData = `REG_NO=${regNo}`;
      const qrDataUrl = await QRCode.toDataURL(qrData, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });

      // Create ticket data
      const ticketData = {
        ticketId: `HOR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        eventName: 'The House of Royals',
        date: '27/02/2026',
        time: '10:00 AM - 3:00 PM',
        venue: 'AR - 202',
        generatedAt: new Date().toISOString(),
        team: data.team,
        merged: data.merged,
        mergeInfo: data.mergeInfo,
      };

      setQrCodeDataUrl(qrDataUrl);
      setTicket(ticketData);
    } catch (err) {
      console.error('Error generating ticket:', err);
      setError('Failed to generate ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      setLoading(true);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPos = 10;

      // Dark background
      pdf.setFillColor(13, 13, 13);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Border
      pdf.setDrawColor(255, 69, 0);
      pdf.setLineWidth(1.2);
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

      // Header - VITERA CLUB
      pdf.setFontSize(28);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      yPos = 22;
      pdf.text('VITERA CLUB', pageWidth / 2, yPos, { align: 'center' });

      // EVENT TICKET
      pdf.setFontSize(11);
      pdf.setTextColor(255, 69, 0);
      yPos += 8;
      pdf.text('EVENT TICKET', pageWidth / 2, yPos, { align: 'center' });

      // Event Name
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      yPos += 14;
      pdf.text('The House of Royals', pageWidth / 2, yPos, { align: 'center' });

      yPos += 14;

      // Merged Team or Single Team Info
      if (ticket.merged && ticket.mergeInfo) {
        // Merged Team Badge
        pdf.setFillColor(255, 69, 0);
        pdf.roundedRect(20, yPos - 5, pageWidth - 40, 14, 3, 3, 'F');
        
        pdf.setFontSize(14);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`MERGED TEAM #${ticket.mergeInfo.mergedTeamID}`, pageWidth / 2, yPos + 3.5, { align: 'center' });
        
        yPos += 17;

        // Description
        pdf.setFontSize(10);
        pdf.setTextColor(200, 200, 200);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`This team consists of ${ticket.mergeInfo.teams.length} merged teams`, pageWidth / 2, yPos, { align: 'center' });
        
        yPos += 10;

        // Each team
        ticket.mergeInfo.teams.forEach((team, idx) => {
          // Team header
          pdf.setFillColor(40, 40, 40);
          pdf.roundedRect(15, yPos, pageWidth - 30, 8, 2, 2, 'F');
          
          pdf.setFontSize(11);
          pdf.setTextColor(255, 140, 0);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Team #${team.teamRowID}`, 20, yPos + 5);
          
          pdf.setTextColor(180, 180, 180);
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.text(`${team.teamSize} Member${team.teamSize > 1 ? 's' : ''}`, pageWidth - 20, yPos + 5, { align: 'right' });
          
          yPos += 11;

          // Members
          team.members.forEach((member, mIdx) => {
            pdf.setFontSize(10);
            pdf.setTextColor(220, 220, 220);
            pdf.setFont('helvetica', 'bold');
            pdf.text(member.name, 25, yPos);
            
            pdf.setTextColor(255, 140, 0);
            pdf.setFont('courier', 'normal');
            pdf.text(member.regNo, pageWidth - 20, yPos, { align: 'right' });
            
            yPos += 6;
          });

          yPos += 3;
        });

        // Total members
        pdf.setFillColor(255, 69, 0);
        pdf.roundedRect(40, yPos, pageWidth - 80, 10, 2, 2, 'F');
        
        const totalMembers = ticket.mergeInfo.teams.reduce((acc, t) => acc + t.teamSize, 0);
        pdf.setFontSize(11);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Total Members: ${totalMembers}`, pageWidth / 2, yPos + 6.5, { align: 'center' });
        
        yPos += 15;
      } else {
        // Single Team
        pdf.setFillColor(40, 40, 40);
        pdf.roundedRect(20, yPos, pageWidth - 40, 10, 2, 2, 'F');
        
        pdf.setFontSize(14);
        pdf.setTextColor(255, 140, 0);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Team #${ticket.team.teamRowID}`, pageWidth / 2, yPos + 6.5, { align: 'center' });
        
        yPos += 15;

        // Members
        ticket.team.members.forEach((member, idx) => {
          pdf.setFontSize(10);
          pdf.setTextColor(220, 220, 220);
          pdf.setFont('helvetica', 'bold');
          pdf.text(member.name, 25, yPos);
          
          pdf.setTextColor(255, 140, 0);
          pdf.setFont('courier', 'normal');
          pdf.text(member.regNo, pageWidth - 25, yPos, { align: 'right' });
          
          yPos += 6.5;
        });

        yPos += 10;
      }

      // QR Code Section
      pdf.setFillColor(50, 50, 50);
      pdf.roundedRect(35, yPos, pageWidth - 70, 60, 3, 3, 'F');
      
      yPos += 7;
      pdf.setFontSize(11);
      pdf.setTextColor(255, 140, 0);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SCAN FOR ENTRY & POLAROID', pageWidth / 2, yPos, { align: 'center' });
      
      // Add QR Code
      yPos += 5;
      const qrSize = 43;
      pdf.addImage(qrCodeDataUrl, 'PNG', (pageWidth - qrSize) / 2, yPos, qrSize, qrSize);
      
      yPos += qrSize + 4;
      pdf.setFontSize(7.5);
      pdf.setTextColor(150, 150, 150);
      pdf.setFont('courier', 'normal');
      pdf.text(`ID: ${ticket.ticketId}`, pageWidth / 2, yPos, { align: 'center' });

      yPos += 12;

      // Event Details
      const details = [
        { label: 'DATE', value: '27th February 2026' },
        { label: 'TIME', value: '10:00 AM - 3:00 PM' },
        { label: 'VENUE', value: 'AR - 202' },
      ];

      details.forEach((detail) => {
        pdf.setFillColor(30, 30, 30);
        pdf.roundedRect(20, yPos - 3, pageWidth - 40, 9, 2, 2, 'F');
        
        pdf.setFontSize(10);
        pdf.setTextColor(255, 69, 0);
        pdf.setFont('helvetica', 'bold');
        pdf.text(detail.label, 25, yPos + 2.5);
        
        pdf.setTextColor(220, 220, 220);
        pdf.setFont('helvetica', 'normal');
        pdf.text(detail.value, pageWidth - 25, yPos + 2.5, { align: 'right' });
        
        yPos += 11;
      });

      yPos += 5;

      // Footer
      pdf.setDrawColor(255, 69, 0);
      pdf.setLineWidth(0.5);
      pdf.line(20, yPos, pageWidth - 20, yPos);
      
      yPos += 5;
      pdf.setFontSize(8.5);
      pdf.setTextColor(180, 180, 180);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Valid for all team members listed above', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 4.5;
      pdf.text('Please arrive 15 minutes before the event', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 4.5;
      pdf.setTextColor(255, 140, 0);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Organized with love by VITERA Club', pageWidth / 2, yPos, { align: 'center' });

      // Save PDF
      pdf.save(`VITERA-Ticket-Team${ticket.merged ? ticket.mergeInfo.mergedTeamID : ticket.team.teamRowID}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRegNo('');
    setTicket(null);
    setQrCodeDataUrl('');
    setError('');
  };

  return (
    <div className="event-ticket-page">
      <div className="ticket-container">
        {!ticket ? (
          <div className="ticket-form-section">
            <div className="form-header">
              <h1 className="form-title">
                Get Your <span className="highlight">Event Ticket</span>
              </h1>
              <p className="event-name">The House of Royals</p>
              <div className="event-details-preview">
                <div className="detail-item">
                  <span className="icon">📅</span>
                  <span>27th February 2026</span>
                </div>
                <div className="detail-item">
                  <span className="icon">🕐</span>
                  <span>10:00 AM - 3:00 PM</span>
                </div>
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <span>AR - 202</span>
                </div>
              </div>
            </div>

            <form onSubmit={generateTicket} className="ticket-form">
              <div className="form-group">
                <label htmlFor="regNo">Registration Number:</label>
                <input
                  type="text"
                  id="regNo"
                  name="regNo"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g., 23BEY10012"
                  required
                />
                <p className="input-hint">Enter any team member's registration number</p>
              </div>

              {error && (
                <div className="error-message">
                  <p>❌ {error}</p>
                </div>
              )}

              <button type="submit" className="generate-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    Generating Ticket...
                  </>
                ) : (
                  <>
                    <span>🎫</span>
                    Generate Event Ticket
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="ticket-display-section">
            <div className="ticket-actions-top">
              <button onClick={resetForm} className="back-btn">
                ← Generate Another
              </button>
            </div>

            <div className="ticket-wrapper">
              <div className="ticket-card">
                {/* Decorative elements */}
                <div className="ticket-pattern"></div>
                <div className="ticket-corner ticket-corner-tl"></div>
                <div className="ticket-corner ticket-corner-tr"></div>
                <div className="ticket-corner ticket-corner-bl"></div>
                <div className="ticket-corner ticket-corner-br"></div>

                {/* Header */}
                <div className="ticket-header">
                  <div className="club-logo">
                    <img src="/vitera_main.png" alt="VITERA Club Logo" className="logo-image" />
                  </div>
                  <h2 className="club-name">VITERA CLUB</h2>
                  <p className="ticket-label">EVENT TICKET</p>
                </div>

                {/* Event Name */}
                <div className="ticket-event-name">
                  <h1>The House of Royals</h1>
                  <div className="crown-decoration">
                    <span>👑</span>
                  </div>
                </div>

                {/* Team Info Section */}
                <div className="ticket-team-section">
                  {ticket.merged && ticket.mergeInfo ? (
                    <>
                      <div className="merge-badge-ticket">
                        <div className="merge-icon">🔗</div>
                        <div className="merge-text">
                          <div className="merge-title">MERGED TEAM</div>
                          <div className="merge-id">Team #{ticket.mergeInfo.mergedTeamID}</div>
                        </div>
                      </div>
                      
                      <div className="merge-description">
                        This team consists of {ticket.mergeInfo.teams.length} merged teams:
                      </div>
                      
                      <div className="teams-container">
                        {ticket.mergeInfo.teams.map((t, idx) => (
                          <div key={t.teamRowID} className="team-group">
                            <div className="team-group-header">
                              <div className="team-header-left">
                                <span className="team-number">Team #{t.teamRowID}</span>
                                <span className="team-size">• {t.teamSize} Member{t.teamSize > 1 ? 's' : ''}</span>
                              </div>
                            </div>
                            <div className="members-grid">
                              {t.members.map((member, mIdx) => (
                                <div key={mIdx} className="member-item">
                                  <span className="member-icon">👤</span>
                                  <div className="member-details-ticket">
                                    <p className="member-name">{member.name}</p>
                                    <p className="member-reg">{member.regNo}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="team-total-count">
                        Total Members: {ticket.mergeInfo.teams.reduce((acc, t) => acc + t.teamSize, 0)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="team-header-single">
                        <h3>Team #{ticket.team.teamRowID}</h3>
                        <span className="team-size-badge">{ticket.team.teamSize} Member{ticket.team.teamSize > 1 ? 's' : ''}</span>
                      </div>
                      <div className="members-grid">
                        {ticket.team.members.map((member, idx) => (
                          <div key={idx} className="member-item">
                            <span className="member-icon">👤</span>
                            <div className="member-details-ticket">
                              <p className="member-name">{member.name}</p>
                              <p className="member-reg">{member.regNo}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* QR Code */}
                <div className="ticket-qr-section">
                  <div className="qr-code-wrapper">
                    <img src={qrCodeDataUrl} alt="Ticket QR Code" className="qr-code-img" />
                  </div>
                  <p className="qr-label">Scan for Entry & Polaroid</p>
                  <p className="ticket-id">ID: {ticket.ticketId}</p>
                </div>

                {/* Event Details */}
                <div className="ticket-details">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <div>
                      <p className="detail-label">Date</p>
                      <p className="detail-value">27th February 2026</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🕐</span>
                    <div>
                      <p className="detail-label">Time</p>
                      <p className="detail-value">10:00 AM - 3:00 PM</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📍</span>
                    <div>
                      <p className="detail-label">Venue</p>
                      <p className="detail-value">AR - 202</p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="ticket-notes">
                  <p className="notes-title">📌 Important Notes:</p>
                  <ul className="notes-list">
                    <li>Valid for all team members listed above</li>
                    <li>Please arrive 15 minutes before the event</li>
                    <li>Keep this QR code for entry & polaroid verification</li>
                  </ul>
                </div>

                {/* Footer */}
                <div className="ticket-footer">
                  <p>Generated on {new Date(ticket.generatedAt).toLocaleString('en-IN')}</p>
                  <p className="footer-tagline">Organized with ❤️ by VITERA Club</p>
                </div>
              </div>
            </div>

            <div className="ticket-actions-bottom">
              <button onClick={downloadPDF} className="action-btn download-btn" disabled={loading}>
                <span>📄</span>
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </button>
            </div>

            <div className="success-message">
              <p>✅ Your event ticket has been generated successfully!</p>
              <p className="success-subtitle">
                Download the PDF and present it at the venue for entry {ticket.team.teamSize > 1 ? 'with your team' : ''}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTicket;
