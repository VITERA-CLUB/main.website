import { useState, useEffect, useRef } from 'react';
import './App.css';
import MessageSection from './MessageSection';
import Footer from './Footer';
import EventsSection from './Event';

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

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className={`loading-logo ${glowEffect ? 'glow-effect zoom-in' : ''}`}>
              <img src="/vitera_main.png" alt="VITERA Club Logo" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`body main-content ${!isLoading ? 'show' : ''}`}>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">VITERA Club</h1>
              <h2 className="hero-subtitle">VIT Bhopal</h2>
              <p className="hero-description">
                <strong>Vitera Club: where purpose meets action.</strong> A community of <strong>changemakers</strong> driven by empathy and unity. From
                impactful projects to thought-provoking events, Vitera brings together
                those who believe in the <strong>power of collective effort</strong> to create real,
                lasting change — on campus and beyond.
              </p>
              <div className="hero-buttons">
                <a href="#events" className="btn btn-primary">Explore Events</a>
                <a href="#team" className="btn btn-secondary">Meet the Team</a>
              </div>
            </div>
            <div className="hero-logo">
              <img src="/vitera_main.png" alt="VITERA Club Logo" />
            </div>
          </div>
        </section>

        <EventsSection />
        <MessageSection />
        <Footer />
      </div>
    </>
  );
}


export default Home;
