<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react'
import './App.css'
import MessageSection from './MessageSection'
import Footer from './components/Footer'
import EventsSection from './components/Event'
import About from './components/About'
import TeamMembers from './components/teamMembers'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

// Reusable header logo with robust fallbacks
function HeaderLogo({ className }) {
  const primary = `${import.meta.env.BASE_URL}vitera_logo.png`;
  const secondary = `${import.meta.env.BASE_URL}vitera_main.png`;
  const fallback = `${import.meta.env.BASE_URL}logo.svg`;
  const handleError = (e) => {
    const img = e.currentTarget;
    if (img.dataset.stage === 'primary') {
      img.src = secondary;
      img.dataset.stage = 'secondary';
    } else if (img.dataset.stage === 'secondary') {
      img.src = fallback;
      img.dataset.stage = 'fallback';
    } else {
      // stop looping
      img.onerror = null;
    }
  };
  return (
    <img
      src={primary}
      data-stage="primary"
      onError={handleError}
      alt="VITERA Club Logo"
      className={className}
    />
  );
}

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);
  return null;
}

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);
  // Logo paths and onError fallback
  const logoSrc = `${import.meta.env.BASE_URL}vitera_logo.png`;
  const logoFallback = `${import.meta.env.BASE_URL}logo.svg`;
  const mainLogoSrc = `${import.meta.env.BASE_URL}vitera_main.png`;
  const onLogoError = (e) => {
    if (e?.currentTarget && e.currentTarget.src !== logoFallback) {
      e.currentTarget.src = logoFallback;
      e.currentTarget.onerror = null;
    }
  };

  // Responsive slides
  const [visibleSlides, setVisibleSlides] = useState(window.innerWidth < 768 ? 1 : 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Images for mobile slider
  const galleryImages = [
    { src: "https://picsum.photos/id/1/800/600", alt: "Gallery image 1" },
    { src: "https://picsum.photos/id/10/400/400", alt: "Gallery image 2" },
    { src: "https://picsum.photos/id/100/400/400", alt: "Gallery image 3" },
    { src: "https://picsum.photos/id/1000/400/400", alt: "Gallery image 4" },
    { src: "https://picsum.photos/id/1001/400/800", alt: "Gallery image 5" },
    { src: "https://picsum.photos/id/1002/400/400", alt: "Gallery image 6" },
    { src: "https://picsum.photos/id/1003/400/400", alt: "Gallery image 7" },
    { src: "https://picsum.photos/id/1004/400/400", alt: "Gallery image 8" },
    { src: "https://picsum.photos/id/1005/800/400", alt: "Gallery image 9" },
    { src: "https://picsum.photos/id/1006/400/400", alt: "Gallery image 10" },
  ];

  // Clamp currentSlide if visibleSlides changes
  useEffect(() => {
    if (currentSlide > galleryImages.length - visibleSlides) {
      setCurrentSlide(Math.max(0, galleryImages.length - visibleSlides));
    }
  }, [visibleSlides]);

  // Update slider position when currentSlide changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * (100 / visibleSlides)}%)`;
    }
  }, [currentSlide, visibleSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev >= galleryImages.length - visibleSlides ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev <= 0 ? galleryImages.length - visibleSlides : prev - 1
    );
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

  // Prevent body scroll when sidebar is open (mobile)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    // Cleanup on unmount
    return () => document.body.classList.remove('sidebar-open');
  }, [isMenuOpen]);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Collage class assignment for dynamic collage
  const getCollageClass = (idx) => {
    // These match the original static collage
    if (idx === 0) return "gallery-item gallery-item-large";
    if (idx === 4) return "gallery-item gallery-item-tall";
    if (idx === 8) return "gallery-item gallery-item-wide";
    return "gallery-item";
  };

  // Responsive visible slides
  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className={`loading-logo ${glowEffect ? 'glow-effect zoom-in' : ''}`}>
              <img src={mainLogoSrc} alt="VITERA Club Logo" onError={onLogoError} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`body main-content ${!isLoading ? 'show' : ''}`}>
        {/* Navigation Bar */}
  <nav className="navbar">
          <div className="container navbar-container">
            {/* Logo Section - Left */}
            <div className="logo-container">
              <HeaderLogo className="logo" />
              <h2 className="club-name">VITERA Club</h2>
            </div>
            
            {/* Navigation Links - Center */}
            <div className="center-nav">
              <div className="nav-links">
                <a href="#events" className="nav-link">Events</a>
                <a href="#about" className="nav-link">About</a>
                <Link to="/team" className="nav-link">Team</Link>
              </div>
            </div>
            
            {/* Feedback Link - Right (inert for now) */}
            <div className="right-nav">
              <div className="nav-cta">
                <a
                  href="#"
                  className="nav-link feedback-link"
                  onClick={(e) => e.preventDefault()}
                  role="button"
                  aria-disabled="true"
                >
                  Feedback/Suggestions
                </a>
              </div>
            </div>
            
            {/* Hamburger menu button for mobile */}
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </div>
            
            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            
            {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <div className="mobile-sidebar-logo">
                <HeaderLogo />
                <h3>VITERA Club</h3>
              </div>
              <div className="mobile-nav-links">
        <a href="#events" className="nav-link" onClick={toggleMenu}>Events</a>
        <a href="#about" className="nav-link" onClick={toggleMenu}>About</a>
        <Link to="/team" className="nav-link" onClick={toggleMenu}>Team</Link>
        <a
          href="#"
          className="nav-link"
          onClick={(e) => { e.preventDefault(); toggleMenu(); }}
          role="button"
          aria-disabled="true"
        >
          Feedback/Suggestions
        </a>
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
                <Link to="/team" className="btn btn-secondary">Meet the Team</Link>
              </div>
            </div>
            
            {/* Right Side - Logo */}
            <div className="hero-logo">
              <img src={mainLogoSrc} alt="VITERA Club Logo" onError={onLogoError} />
            </div>
          </div>
        </section>
          <About />
          <EventsSection/>
        {/* Message Section */}
        <MessageSection />

        <Footer />
      </div>
    </>
  )
}

function TeamPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  useEffect(() => {
    if (isMenuOpen) document.body.classList.add('sidebar-open');
    else document.body.classList.remove('sidebar-open');
    return () => document.body.classList.remove('sidebar-open');
  }, [isMenuOpen]);

  return (
    <div className="body main-content show">
      <nav className="navbar">
        <div className="container navbar-container">
          <div className="logo-container">
            <HeaderLogo className="logo" />
            <h2 className="club-name">VITERA Club</h2>
          </div>

          <div className="center-nav">
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/#events" className="nav-link">Events</Link>
              <Link to="/#about" className="nav-link">About</Link>
            </div>
          </div>

          <div className="right-nav">
            <div className="nav-cta">
              <a
                href="#"
                className="nav-link feedback-link"
                onClick={(e) => e.preventDefault()}
                role="button"
                aria-disabled="true"
              >
                Feedback/Suggestions
              </a>
            </div>
          </div>

          {/* Hamburger menu button for mobile */}
          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </div>

          {/* Mobile Navigation Overlay */}
          <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>

          {/* Mobile Navigation Menu */}
          <div className={`mobile-nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <div className="mobile-sidebar-logo">
              <HeaderLogo />
              <h3>VITERA Club</h3>
            </div>
            <div className="mobile-nav-links">
              <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
              <Link to="/#events" className="nav-link" onClick={toggleMenu}>Events</Link>
              <Link to="/#about" className="nav-link" onClick={toggleMenu}>About</Link>
              <a
                href="#"
                className="nav-link"
                onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                role="button"
                aria-disabled="true"
              >
                Feedback/Suggestions
              </a>
            </div>
          </div>
        </div>
      </nav>

      <TeamMembers />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </>
  );
}

export default App
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Feedback from './components/Feedback';

function App() {
  return (
    <Router>
      {/* Navbar is always on top */}
      <Navbar />

      {/* Routes below Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
>>>>>>> b76128316a094cc69224b5ff94170c6726e8ec9a
