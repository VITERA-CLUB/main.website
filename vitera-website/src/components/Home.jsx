import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import MessageSection from './MessageSection';
import Footer from './Footer';
import EventsSection from './Event';
import GallerySection from './GallerySection';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);
  
  useEffect(() => {
    const glowTimer = setTimeout(() => {
      setGlowEffect(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 1500);

    return () => clearTimeout(glowTimer);
  }, []);

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
              <a href="#events" className="btn btn-primary">Explore Events</a>
              <a href="#team" className="btn btn-secondary">Meet the Team</a>
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