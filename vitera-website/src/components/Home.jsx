import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import './App.css';
import MessageSection from './MessageSection';
import Footer from './Footer';
import EventsSection from './Event';
import GallerySection from './GallerySection';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  
  // Event data for the popup
  const upcomingEvent = {
    name: "Design for Good – Vitera Edition",
    description: "Join us for a FREE online creative contest that encourages students to use design and storytelling to highlight social issues and inspire positive change. Create powerful posters based on social issues, real-life stories, or impactful statistics.",
    posterImage: "/images/Events_Pics/DesignForGood/poster.jpg",
    date: "January 2, 2026",
    time: "11:59 PM",
    registrationLink: "https://forms.gle/wBne8LZgBbKq31Aj8",
    deadline: "2nd January 2026, 11:59 PM"
  };

  useEffect(() => {
    const glowTimer = setTimeout(() => {
      setGlowEffect(true);
      setTimeout(() => {
        setIsLoading(false);
        // Popup disabled - comment out the line below to re-enable
        // setTimeout(() => {
        //   setShowEventPopup(true);
        // }, 500);
      }, 1000);
    }, 1500);

    return () => clearTimeout(glowTimer);
  }, []);

  const closePopup = () => {
    setShowEventPopup(false);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className={`loading-logo ${glowEffect ? 'glow-effect zoom-in' : ''}`}>
            <img src="/vitera_main.png" alt="VITERA Club Logo" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`body main-content show`}>
      {/* Event Popup Modal */}
      {showEventPopup && (
        <div className="event-popup-overlay" onClick={closePopup}>
          <div className="event-popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={closePopup}>
              <X size={24} />
            </button>
            
            <div className="popup-content">
              <div className="popup-poster">
                <img src={upcomingEvent.posterImage} alt={upcomingEvent.name} />
              </div>
              
              <div className="popup-details">
                <h2 className="popup-event-name">{upcomingEvent.name}</h2>
                
                <div className="popup-event-meta">
                  <div className="meta-item">
                    <span className="meta-label">Date:</span>
                    <span className="meta-value">{upcomingEvent.date}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Deadline:</span>
                    <span className="meta-value">{upcomingEvent.deadline}</span>
                  </div>
                </div>
                
                <p className="popup-event-description">{upcomingEvent.description}</p>
                
                <div className="popup-actions">
                  <a 
                    href={upcomingEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-register-btn"
                  >
                    Register Now
                  </a>
                  <button className="popup-close-text-btn" onClick={closePopup}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              VITERA Club
            </motion.h1>
            
            <motion.h2 
              className="hero-subtitle"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              VIT Bhopal
            </motion.h2>
            
            <motion.p 
              className="hero-description"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <strong>Vitera Club: where purpose meets action.</strong> A community of <strong>changemakers</strong> driven by empathy and unity. From
              impactful projects to thought-provoking events, Vitera brings together
              those who believe in the <strong>power of collective effort</strong> to create real,
              lasting change — on campus and beyond.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <a href="/events" className="btn btn-primary">Explore Events</a>
              <a href="/team" className="btn btn-secondary">Meet the Team</a>
            </motion.div>
          </motion.div>
          
          <div className="hero-logo">
            <img src="/vitera_main.png" alt="VITERA Club Logo" />
          </div>
        </div>
      </section>

      <GallerySection />
      <EventsSection />
      <MessageSection />
      <Footer />
    </div>
  );
}

export default Home;