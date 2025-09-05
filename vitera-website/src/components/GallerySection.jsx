import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // new: store scroll position for restoring
  const scrollYRef = useRef(0);

  // Gallery images array
  const galleryImages = [
    { src: '/images/gallery/1.webp', size: 'large' },
    { src: '/images/gallery/2.webp', size: 'tall' },
    { src: '/images/gallery/3.webp', size: 'small' },
    { src: '/images/gallery/4.webp', size: 'small' },
    { src: '/images/gallery/5.webp', size: 'tall' },
    { src: '/images/gallery/13.webp', size: 'large' },
    { src: '/images/gallery/7.webp', size: 'small' },
    { src: '/images/gallery/8.webp', size: 'small' },
    { src: '/images/gallery/9.webp', size: 'small' },
    { src: '/images/gallery/10.webp', size: 'small' },
    { src: '/images/gallery/6.webp', size: 'wide' },


    // Add more images as needed
  ];

  // Simple next slide function - keep track of exact index
  const nextSlide = () => {
    setCurrentSlide((current) => {
      const next = (current + 1) % galleryImages.length;
      return next;
    });
  };

  // Auto-advance slides on mobile with proper timing
  useEffect(() => {
    if (isPaused || window.innerWidth > 768) return;

    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Apply transform accurately when slide changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  // Touch handling with better pause/resume logic
  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Open lightbox and lock scroll (prevent jump)
  const openLightbox = (image) => {
    // store current scroll
    scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    // lock scroll by fixing body
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    setSelectedImage(image);
  };

  // Close lightbox and restore scroll
  const closeLightbox = () => {
    // clear selected image first to remove overlay
    setSelectedImage(null);
    // restore body scroll after a tick so overlay can fade if needed
    const y = scrollYRef.current;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    window.scrollTo(0, y);
  };

  // cleanup on unmount (in case)
  useEffect(() => {
    return () => {
      // restore any body styles left behind
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, []);

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">
        Capturing <span className="highlight">Moments</span>
      </h2>

      {/* New inner wrapper to constrain width */}
      <div className="gallery-inner">
        {/* Desktop Gallery Grid */}
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${image.size}`}
              onClick={() => openLightbox(image)}
            >
              <img src={image.src} alt={`Gallery ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        {/* Mobile Slider with Improved Structure */}
        <div className="mobile-slider-container">
          <div
            ref={sliderRef}
            className="mobile-slider"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {galleryImages.map((image, index) => (
              <div key={index} className="mobile-slide">
                <div className="slide-content">
                  <img
                    src={image.src}
                    alt={`Gallery ${index + 1}`}
                    loading="lazy"
                    onClick={() => openLightbox(image)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots with Clearer Active State */}
          <div className="mobile-dots">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 1500);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox rendered via portal so position:fixed is relative to viewport */}
      {selectedImage &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            onClick={closeLightbox}
          >
            <img src={selectedImage.src} alt="Selected gallery item" />
            <button
              className="close-btn"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </section>
  );
};

export default GallerySection;
