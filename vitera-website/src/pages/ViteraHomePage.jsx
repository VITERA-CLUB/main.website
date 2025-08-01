import MessageSection from '../MessageSection'
import Footer from '../components/Footer'
import { useState, useEffect, useRef } from 'react'
import './ViteraHomePage.css';

function ViteraHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [glowEffect, setGlowEffect] = useState(false)
  const [visibleSlides, setVisibleSlides] = useState(window.innerWidth < 768 ? 1 : 3)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)

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

  useEffect(() => {
    if (currentSlide > galleryImages.length - visibleSlides) {
      setCurrentSlide(Math.max(0, galleryImages.length - visibleSlides));
    }
  }, [visibleSlides]);

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

  useEffect(() => {
    const glowTimer = setTimeout(() => {
      setGlowEffect(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 1500);
    return () => clearTimeout(glowTimer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getCollageClass = (idx) => {
    if (idx === 0) return "gallery-item gallery-item-large";
    if (idx === 4) return "gallery-item gallery-item-tall";
    if (idx === 8) return "gallery-item gallery-item-wide";
    return "gallery-item";
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className={`loading-logo ${glowEffect ? 'glow-effect zoom-in' : ''}`}>
              <img src="/src/assets/vitera_main.png" alt="VITERA Club Logo" />
            </div>
          </div>
        </div>
      )}

      <div className={`main-content ${!isLoading ? 'show' : ''}`}>
        <nav className="navbar">
          <div className="container navbar-container">
            <div className="logo-container">
              <img src="/src/assets/vitera_logo.png" alt="VITERA Club Logo" className="logo" />
              <h2 className="club-name">VITERA Club</h2>
            </div>

            <div className="center-nav">
              <div className="nav-links">
                <a href="#events" className="nav-link">Events</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#team" className="nav-link">Team</a>
              </div>
            </div>

            <div className="right-nav">
              <div className="nav-cta">
                <a href="/feedback" className="nav-link feedback-link">Feedback/Suggestions</a>
              </div>
            </div>

            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </div>

            <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>

            <div className={`mobile-nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <div className="mobile-sidebar-logo">
                <img src="/src/assets/vitera_logo.png" alt="VITERA Club Logo" />
                <h3>VITERA Club</h3>
              </div>
              <div className="mobile-nav-links">
                <a href="#events" className="nav-link" onClick={toggleMenu}>Events</a>
                <a href="#about" className="nav-link" onClick={toggleMenu}>About</a>
                <a href="#team" className="nav-link" onClick={toggleMenu}>Team</a>
                <a href="/feedback" className="nav-link" onClick={toggleMenu}>Feedback/Suggestions</a>
              </div>
            </div>
          </div>
        </nav>

        <section className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">VITERA Club</h1>
              <h2 className="hero-subtitle">VIT Bhopal</h2>
              <p className="hero-description">
                <strong>Vitera Club: where purpose meets action.</strong> A community of <strong>changemakers</strong> driven by empathy and unity...
              </p>
              <div className="hero-buttons">
                <a href="#events" className="btn btn-primary">Explore Events</a>
                <a href="#team" className="btn btn-secondary">Meet the Team</a>
              </div>
            </div>

            <div className="hero-logo">
              <img src="/src/assets/vitera_main.png" alt="VITERA Club Logo" />
            </div>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container">
            <h2 className="section-title">Our Gallery</h2>

            <div className="gallery-grid desktop-gallery">
              {galleryImages.map((img, idx) => (
                <div className={getCollageClass(idx)} key={idx}>
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>

            <div className="mobile-gallery-container">
              <div className="gallery-nav-buttons">
                <button className="gallery-nav-btn prev-btn" onClick={prevSlide}>←</button>
                <button className="gallery-nav-btn next-btn" onClick={nextSlide}>→</button>
              </div>
              <div className="mobile-gallery-slider" ref={sliderRef}>
                {galleryImages.map((img, idx) => (
                  <div
                    className="mobile-gallery-slide"
                    key={idx}
                    style={{
                      minWidth: visibleSlides === 1 ? "100%" : "calc(100% / 3)"
                    }}
                  >
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MessageSection />
        <Footer />
      </div>
    </>
  )
}

export default ViteraHomePage
