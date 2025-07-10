import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Simplified loading sequence
  useEffect(() => {
    // Step 1: Show initial logo for 1.5 seconds
    const glowTimer = setTimeout(() => {
      setGlowEffect(true);
      
      // Step 2: Add glow effect and start zoom after 0.5 seconds
      setTimeout(() => {
        // Step 3: Complete loading after total of ~3 seconds
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
              <img src="/src/assets/vitera_main.png" alt="VITERA Club Logo" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`main-content ${!isLoading ? 'show' : ''}`}>
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="container navbar-container">
            {/* Logo Section - Left */}
            <div className="logo-container">
              <img src="/src/assets/vitera_logo.png" alt="VITERA Club Logo" className="logo" />
              <h2 className="club-name">VITERA Club</h2>
            </div>
            
            {/* Navigation Links - Center */}
            <div className="center-nav">
              <div className="nav-links">
                <a href="#events" className="nav-link">Events</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#team" className="nav-link">Team</a>
              </div>
            </div>
            
            {/* Feedback Link - Right */}
            <div className="right-nav">
              <div className="nav-cta">
                <a href="#feedback" className="nav-link feedback-link">Feedback/Suggestions</a>
              </div>
            </div>
            
            {/* Hamburger menu button for mobile */}
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </div>
            
            {/* Mobile Navigation Menu */}
            <div className={`mobile-nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <div className="mobile-nav-links">
                <a href="#events" className="nav-link">Events</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#team" className="nav-link">Team</a>
                <a href="#feedback" className="nav-link">Feedback/Suggestions</a>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Hero Section */}
        <section className="hero-section">
          <div className="container hero-container">
            {/* Left Side - Text Content */}
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
            
            {/* Right Side - Logo */}
            <div className="hero-logo">
              <img src="/src/assets/vitera_main.png" alt="VITERA Club Logo" />
            </div>
          </div>
        </section>
      </div>
    </> 
  )
}


export default App
