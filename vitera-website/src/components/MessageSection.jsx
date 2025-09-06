import React, { useState, useEffect, useRef } from 'react';
import './MessageSection.css';

const teamMessages = [
  {
    img: '/images/Our Team/Panel/lakshya.webp',
    name: 'Lakshya Pandey',
    occupation: 'President',
    message: 'Leading Vitera has been a journey of growth and unity. Together, we create impact beyond boundaries.',
  },
  {
    img: '/images/Our Team/Panel/spandan.webp',
    name: 'Spandan Agrawal',
    occupation: 'Vice President',
    message: 'Every event is a new opportunity to inspire and empower. Proud to be part of this vibrant family.',
  },
  {
    img: '/images/Our Team/Panel/parthib.webp',
    name: 'Parthib Datta Muhuri',
    occupation: 'General Secretary',
    message: 'Vitera is where ideas turn into action. Let\'s keep making a difference, one step at a time.',
  },
  {
    img: '/images/Our Team/Panel/azhan.webp',
    name: 'Azhan Javed',
    occupation: 'Joint Secretary',
    message: 'Managing resources for Vitera is a privilege. Our collective effort is our greatest asset.',
  },
  {
    img: '/images/Our Team/Panel/prashant.webp',
    name: 'Prashant Kaundal',
    occupation: 'Chairperson',
    message: 'Organizing events with this team is always exciting. Here\'s to more memories and milestones!',
  },
  {
    img: '/images/Our Team/Panel/udit.webp',
    name: 'Udit Gupta',
    occupation: 'Financial Head',
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

  // Touch event states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-slide settings
  const AUTO_SLIDE_INTERVAL = 5000; // ms (change as needed)
  const [isPaused, setIsPaused] = useState(false);

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

  // Desktop auto-slide (advances to next set)
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      nextMessages();
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, currentMessageIndex]); // re-start when index changes or pause toggles

  // Mobile auto-slide
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      nextMobileMessage();
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, currentMobileSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // pause when touching
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    
    const diff = touchStart - touchEnd;
    const threshold = 50; // minimum distance for swipe

    if (diff > threshold) {
      // Swipe left
      nextMobileMessage();
    } else if (diff < -threshold) {
      // Swipe right
      prevMobileMessage();
    }

    setTouchStart(null);
    setTouchEnd(null);
    // resume after short delay to avoid immediate auto-move while finishing interaction
    setTimeout(() => setIsPaused(false), 400);
  };

  return (
    <section className="message-section">
      <div className="container">
        <h2 className="message-title">
          <span className="white-text">Message From </span>
          <span className="orange-text">The Team</span>
        </h2>
        
        {/* Desktop Messages View */}
        <div
          className="desktop-message-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
        <div
          className="mobile-message-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="mobile-message-slider"
            ref={mobileSliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(-${currentMobileSlide * 100}%)`
            }}
          >
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
          
          {/* Mobile Navigation Dots */}
          <div className="mobile-nav-dots">
            {teamMessages.map((_, idx) => (
              <div
                key={idx}
                className={`nav-dot ${currentMobileSlide === idx ? 'active' : ''}`}
                onClick={() => { setCurrentMobileSlide(idx); setIsPaused(true); setTimeout(()=>setIsPaused(false), 800); }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessageSection;
