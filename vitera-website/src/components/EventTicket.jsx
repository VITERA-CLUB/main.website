import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import './EventTicket.css';

const EventTicket = () => {
  const [formData, setFormData] = useState({
    regNo: '',
  });
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const ticketRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate unique ticket ID
      const ticketId = `HOR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Create ticket data
      const ticketData = {
        ...formData,
        ticketId,
        eventName: 'The House of Royals',
        date: '27/02/2026',
        time: '10:00 AM - 3:00 PM',
        venue: 'AR - 202',
        passType: 'Group Pass',
        generatedAt: new Date().toISOString(),
      };

      // Generate QR Code in the same format as QRGenerator.js
      // Format: REG_NO={regNo} - this allows the Entry/Polaroid pages to scan it
      const qrData = `REG_NO=${ticketData.regNo}`;

      const qrDataUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });

      setQrCodeDataUrl(qrDataUrl);
      setTicket(ticketData);
    } catch (error) {
      console.error('Error generating ticket:', error);
      alert('Failed to generate ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = () => {
    if (!qrCodeDataUrl) return;

    // Download only the QR code
    const link = document.createElement('a');
    link.download = `VITERA-QR-${ticket.ticketId}.png`;
    link.href = qrCodeDataUrl;
    link.click();
  };

  const printTicket = () => {
    window.print();
  };

  const resetForm = () => {
    setFormData({ regNo: '' });
    setTicket(null);
    setQrCodeDataUrl('');
  };

  return (
    <div className="event-ticket-page">
      <div className="ticket-container">
        {!ticket ? (
          <div className="ticket-form-section">
            <div className="form-header">
              <h1 className="form-title">
                Get Your <span className="highlight">Group Pass</span>
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
              <p className="pass-type-info">👥 Generate a group pass for your entire team</p>
            </div>

            <form onSubmit={generateTicket} className="ticket-form">
              <div className="form-group">
                <label htmlFor="regNo">Registration Number :</label>
                <input
                  type="text"
                  id="regNo"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleInputChange}
                  placeholder="e.g., 23BEY10012"
                  required
                />
                <p className="input-hint">Enter any team member's registration number</p>
              </div>

              <button type="submit" className="generate-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    Generating Group Pass...
                  </>
                ) : (
                  <>
                    <span>👥</span>
                    Generate Group Pass
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

            <div className="ticket-wrapper" ref={ticketRef}>
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
                    {/* <div className="logo-circle">V</div> */}
                    <img src="/vitera_main.png" alt="VITERA Club Logo" className="logo-image" />
                  </div>
                  <h2 className="club-name">VITERA CLUB</h2>
                  <p className="ticket-label">GROUP EVENT PASS</p>
                </div>

                {/* Event Name */}
                <div className="ticket-event-name">
                  <h1>The House of Royals</h1>
                  <div className="crown-decoration">
                    <span>👑</span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="ticket-qr-section">
                  <div className="qr-code-wrapper">
                    <img src={qrCodeDataUrl} alt="Ticket QR Code" className="qr-code-img" />
                  </div>
                  <p className="qr-label">Scan to Verify</p>
                  <p className="ticket-id">ID: {ticket.ticketId}</p>
                </div>

                {/* Attendee Info */}
                <div className="ticket-info">
                  <div className="info-row info-row-single">
                    <span className="info-label">Team Registration Number</span>
                    <span className="info-value">{ticket.regNo}</span>
                  </div>
                  <div className="info-row info-row-single">
                    <span className="info-label">Pass Type</span>
                    <span className="info-value">👥 {ticket.passType}</span>
                  </div>
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

                {/* Welcome Message */}
                <div className="ticket-welcome">
                  <p className="welcome-text">
                    🎭 Welcome to The House of Royals! 🎭
                  </p>
                  <p className="welcome-subtitle">
                    We're excited to have your entire team join us for an unforgettable experience of elegance and grandeur. This group pass is valid for all team members.
                  </p>
                </div>

                {/* Important Notes */}
                <div className="ticket-notes">
                  <p className="notes-title">📌 Important Notes:</p>
                  <ul className="notes-list">
                    <li>Group pass valid for all team members</li>
                    <li>Please arrive 15 minutes before the event starts</li>
                    <li>Keep this QR code handy for entry verification</li>
                    <li>All team members must enter together</li>
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
              <button onClick={downloadTicket} className="action-btn download-btn">
                <span>⬇️</span>
                Download QR Code
              </button>
            </div>

            <div className="success-message">
              <p>✅ Your group pass has been generated successfully!</p>
              <p className="success-subtitle">
                Download the QR code or print the pass and present it at the venue for team entry.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTicket;
