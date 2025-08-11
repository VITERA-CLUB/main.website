import { useState, useEffect, useRef } from 'react';
import './App.css';
import MessageSection from './MessageSection';
import Footer from './Footer';
import EventsSection from './Event';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(window.innerWidth < 768 ? 1 : 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

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
              <img src="/src/assets/vitera_main.png" alt="VITERA Club Logo" />
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
