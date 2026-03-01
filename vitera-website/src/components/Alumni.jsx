// Alumni.jsx
import React from 'react';
import './Alumni.css';

const Alumni = () => {
  const alumniData = [
    {
      name: "Lakshya Pandey",
      role: "Founder & Ex-President",
      exRole: "Founder",
      image: "/images/alumni/lakshya.webp"
    },
    {
      name: "Spandan Agrawal",
      role: "Founder & Ex-Vice President",
      exRole: "Co-Founder",
      image: "/images/alumni/spandan.jpg"
    },
    {
      name: "Rishika Snehal",
      role: "Ex-Social Media Lead",
      exRole: "Social Media Team",
      image: "/images/alumni/rishika.jpg"
    },
    {
      name: "Bidhi Sarma",
      role: "Ex-Event Lead",
      exRole: "Event Management Team",
      image: "/images/alumni/bidhi.jpg"
    },
    {
      name: "Mahijith Choudhary",
      role: "Ex-Event Co-Lead",
      exRole: "Event Management Team",
      image: "/images/alumni/mahijith.jpg"
    },
    {
      name: "Taneesh Patel",
      role: "Ex-Technical Lead",
      exRole: "Technical Team",
      image: "/images/Our Team/Tech Team/taneesh.jpeg"
    },
    {
      name: "Shravan Jain",
      role: "Ex-Technical Co-Lead",
      exRole: "Technical Team",
      image: "/images/Our Team/Tech Team/shravan.jpg"
    },
    {
      name: "Bhaskar Ojha",
      role: "Ex-Technical Member",
      exRole: "Technical Team",
      image: "/images/alumni/bhaskar.jpg"
    },
    {
      name: "Avinash Kumar",
      role: "Ex-Technical Member",
      exRole: "Technical Team",
      image: "/images/Our Team/Tech Team/avinash.jpg"
    },
   {
      name: "Akshay Kumar Mishra",
      role: "Ex-Technical Member",
      exRole: "Technical Team",
      image: "/images/Our Team/Tech Team/akshay.jpg"
    },
  {
      name: "Kapil Kumar Arya",
      role: "Ex-Technical Member",
      exRole: "Technical Team",
      image: "/images/Our Team/Tech Team/kapil.jpg"
    },
  {
      name: "Arya Sharma",
      role: "Ex-PR & Outreach Team Lead",
      exRole: "PR & Outreach Team",
      image: "/images/Our Team/PR & Outreach Team/arya sharma.jpg"
    },
  {
      name: "Mohd Hammad",
      role: "Ex-Photography Team Lead",
      exRole: "Technical Team",
      image: "/images/Our Team/Photography Team/hammad.jpg"
    },
  {
      name: "Saurav Pandey",
      role: "Ex-Design Team Lead",
      exRole: "Design Team",
      image: "/images/Our Team/Design Team/saurav.jpeg"
    },
  {
      name: "Aribah Amin",
      role: "Ex-Design Team Co-Lead",
      exRole: "Design Team",
      image: "/images/Our Team/Design Team/aribah.jpg"
    },
    {
      name: "Navya Srivastava",
      role: "Ex-Content Team Co-Lead",
      exRole: "Content Team",
      image: "/images/Our Team/Content Team/navya.jpg"
    },
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
              <img 
                src={alumni.image} 
                alt={alumni.name}
                className="alumni-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="alumni-image placeholder" style={{ display: 'none' }}>
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="alumni-overlay">
                <span className="view-profile"><i className="fas fa-leaf"></i> Our Alumini's</span>
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
        <i className="fas fa-heart" style={{ color: 'var(--primary)' }}></i> Past Leaders who shaped VITERA...
      </div>
    </div>
  );
};

export default Alumni;
