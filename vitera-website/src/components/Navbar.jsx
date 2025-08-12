import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="logo-container">
          <img src="/vitera_logo.png" alt="VITERA Club Logo" className="logo" />
          <h2 className="club-name">VITERA Club</h2>
        </div>

        <div className="center-nav">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <a href="#events" className="nav-link">Events</a>
            <a href="#about" className="nav-link">About</a>
            <a href="/team" className="nav-link">Team</a>
          </div>
        </div>

        <div className="right-nav">
          <div className="nav-cta">
            <Link to="/feedback" className="nav-link feedback-link">
              Feedback/Suggestions
            </Link>
          </div>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </div>

        <div
          className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        ></div>

        <div className={`mobile-nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-sidebar-logo">
            <img src="/vitera_logo.png" alt="VITERA Club Logo" />
            <h3>VITERA Club</h3>
          </div>
          <div className="mobile-nav-links">
            <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
            <a href="#events" className="nav-link" onClick={toggleMenu}>Events</a>
            <a href="#about" className="nav-link" onClick={toggleMenu}>About</a>
            <a href="/team" className="nav-link" onClick={toggleMenu}>Team</a>
            <Link to="/feedback" className="nav-link" onClick={toggleMenu}>Feedback/Suggestions</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
