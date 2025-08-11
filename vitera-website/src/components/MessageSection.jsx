import { useState, useEffect, useRef } from 'react';
import './MessageSection.css';

const teamMessages = [
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Arjun Mehta',
    occupation: 'President',
    message: 'Leading Vitera has been a journey of growth and unity. Together, we create impact beyond boundaries.',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Priya Sharma',
    occupation: 'Vice President',
    message: 'Every event is a new opportunity to inspire and empower. Proud to be part of this vibrant family.',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'Rahul Verma',
    occupation: 'General Secretary',
    message: 'Vitera is where ideas turn into action. Let\'s keep making a difference, one step at a time.',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Sneha Patel',
    occupation: 'Treasurer',
    message: 'Managing resources for Vitera is a privilege. Our collective effort is our greatest asset.',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/77.jpg',
    name: 'Vikram Singh',
    occupation: 'Event Coordinator',
    message: 'Organizing events with this team is always exciting. Here\'s to more memories and milestones!',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/85.jpg',
    name: 'Aditi Rao',
    occupation: 'Public Relations',
    message: 'Connecting with our community is at the heart of Vitera. Thank you for your constant support!',
  },
];

function MessageSection() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messagesPerPage = 3; // Number of messages to show on desktop
  const totalMessages = teamMessages.length;
  const maxStartIndex = totalMessages - messagesPerPage;
  const messageSliderRef = useRef(null);

  // For mobile view
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const mobileSliderRef = useRef(null);

  // Navigate to previous set of messages
  const prevMessages = () => {
    setCurrentMessageIndex((prev) => (prev <= 0 ? maxStartIndex : prev - messagesPerPage));
  };

  // Navigate to next set of messages
  const nextMessages = () => {
    setCurrentMessageIndex((prev) => (prev >= maxStartIndex ? 0 : prev + messagesPerPage));
  };

  // Mobile navigation
  const prevMobileMessage = () => {
    setCurrentMobileSlide((prev) => (prev <= 0 ? totalMessages - 1 : prev - 1));
  };

  const nextMobileMessage = () => {
    setCurrentMobileSlide((prev) => (prev >= totalMessages - 1 ? 0 : prev + 1));
  };

  // Update mobile slider position when currentMobileSlide changes
  useEffect(() => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.style.transform = `translateX(-${currentMobileSlide * 100}%)`;
    }
  }, [currentMobileSlide]);

  return (
    <section className="message-section">
      <div className="container">
        <h2 className="message-title">
          <span className="white-text">Message From </span><br></br>
          <span className="orange-text">The Core Team Members</span>
        </h2>
        
        {/* Desktop Messages View */}
        <div className="desktop-message-container">
          <div className="message-cards">
            {teamMessages.slice(currentMessageIndex, currentMessageIndex + messagesPerPage).map((member, idx) => (
              <div className="message-card" key={idx}>
                <div className="profile-pic">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-occupation">{member.occupation}</p>
                  <p className="member-message">"{member.message}"</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Navigation Buttons */}
          <div className="message-nav-buttons">
            <button className="message-nav-btn" onClick={prevMessages}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="message-nav-btn" onClick={nextMessages}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Messages Slider */}
        <div className="mobile-message-container">
          <div className="mobile-message-slider" ref={mobileSliderRef}>
            {teamMessages.map((member, idx) => (
              <div className="mobile-message-slide" key={idx}>
                <div className="message-card">
                  <div className="profile-pic">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-occupation">{member.occupation}</p>
                    <p className="member-message">"{member.message}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation Buttons */}
          <div className="mobile-message-nav-buttons">
            <button className="message-nav-btn" onClick={prevMobileMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="message-nav-btn" onClick={nextMobileMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessageSection;
