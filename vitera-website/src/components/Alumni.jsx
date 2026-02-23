// Alumni.jsx
import React from 'react';
import './Alumni.css';

const Alumni = () => {
  const alumniData = [
    {
      name: "Lakshya Pandey",
      role: "Founder & Ex-President",
      exRole: "Panel",
      icon: "fa-user-circle"
    },
    {
      name: "Spandan Agrawal",
      role: "Founder & Ex-Vice President",
      exRole: "Panel",
      icon: "fa-user-circle"
    },
    {
      name: "Rishika Snehal",
      role: "Ex-Social Media Lead",
      exRole: "Technical",
      icon: "fa-user-circle"
    },
    {
      name: "Bidhi Sarma",
      role: "Ex-Event Lead",
      exRole: "Events",
      icon: "fa-user-circle"
    },
    {
      name: "Mahijith Choudhary",
      role: "Ex-Event Co-Lead",
      exRole: "Events",
      icon: "fa-user-circle"
    },
    {
      name: "Bhaskar Ojha",
      role: "Ex-Tech Member",
      exRole: "Technical",
      icon: "fa-user-circle"
    }
  ];

  return (
    <div className="alumni-wrapper">
      {/* header with navigation button style */}
      <div className="alumni-header">
        {/* CHANGED: Heading changed from "Alumni · former crew" to "Meet Our Alumni" with primary color on "Our" */}
        <h2 className="alumni-title">Meet <span>Our</span> Alumni</h2>
        {/* CHANGED: Removed the alumni-badge div containing "Ex‑team" */}
      </div>

      {/* alumni grid with exact card styling from reference */}
      <div className="alumni-grid alumni-section">
        {alumniData.map((alumni, index) => (
          <div className="alumni-card" key={index}>
            <div className="alumni-image-wrapper">
              <div className="alumni-image placeholder">
                <i className={`fas ${alumni.icon}`}></i>
              </div>
              <div className="alumni-overlay">
                <span className="view-profile"><i className="fas fa-leaf"></i> VITERA</span>
              </div>
            </div>
            <div className="alumni-info">
              <div className="alumni-name">{alumni.name}</div>
              <div className="alumni-role">{alumni.role}</div>
              <div className="alumni-ex-role">
                <i className="fas fa-star" style={{ color: 'var(--primary)', fontSize: '0.7rem' }}></i> {alumni.exRole}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* subtle footer line matching the dark theme */}
      <div style={{ 
        marginTop: '2.5rem', 
        textAlign: 'center', 
        fontSize: '0.85rem', 
        color: 'rgba(255,255,255,0.3)', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        paddingTop: '1.5rem' 
      }}>
        <i className="fas fa-heart" style={{ color: 'var(--primary)' }}></i> past leaders who shaped VITERA
      </div>
    </div>
  );
};

export default Alumni;
