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
          <Link to="/"><h2 className="club-name">VITERA Club</h2></Link>
        </div>

        <div className="center-nav">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <a href="/events" className="nav-link">Events</a>
            <Link to="/about" className="nav-link">About</Link>
            
            {/*<Link to="/alumni" className="nav-link">Alumni</Link>*/}
            <a href="/team" className="nav-link">Team</a>
            <a href="/winner" className="nav-link">Winners</a>
            <Link to="/event-pass" className="nav-link event-pass-link">
              ✨ Event Pass
            </Link>
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
            <a href="/events" className="nav-link" onClick={toggleMenu}>Events</a>
            <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
            <a href="/team" className="nav-link" onClick={toggleMenu}>Team</a>
            <Link to="/alumni" className="nav-link" onClick={toggleMenu}>Alumni</Link>
            <a href="/winner" className="nav-link" onClick={toggleMenu}>Winners</a>
            <Link to="/event-pass" className="nav-link event-pass-link" onClick={toggleMenu}>
              ✨ Event Pass
            </Link>
            <Link to="/feedback" className="nav-link" onClick={toggleMenu}>Feedback/Suggestions</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
