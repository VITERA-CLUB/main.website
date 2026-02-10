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
    name: "The House of Royals",
    description: 'The House of Royals is where competition meets celebration Step into an action-packed arena featuring exciting games like Stack-E-Cups, Match the Cups, Musical Chairs, Balloon Flip, and the thrilling Break the Tower Challenge, where speed, focus, and fun earn you royal stamps.As the games conclude, Hour 3 kicks off with an energetic DJ session that keeps the vibe alive.The spotlight then shifts to a confident and stylish Ramp Walk, where participants own the stage.Capture the moments at the Polaroid Photo Booth and take home instant royal memories.The event wraps up with a grand Crowning Ceremony, celebrating creativity, style, and true royal spirit ✨',
    posterImage: "/images/Events_Pics/The-House-of-Royals/poster.jpeg",
    date: "February 27, 2026",
    time: "10:00 AM",
    registrationLink: "https://forms.gle/5RuRtvWPANtHfcQj9",
    deadline: "20th February 2026, 11:59 PM"
  };

  useEffect(() => {
    const glowTimer = setTimeout(() => {
      setGlowEffect(true);
      setTimeout(() => {
        setIsLoading(false);
        // Popup disabled - comment out the line below to re-enable
         setTimeout(() => {
           setShowEventPopup(true);
         }, 500);
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
