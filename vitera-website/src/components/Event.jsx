import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// SmartImage helper (same logic as in EventTimeline)
const SmartImage = ({ src, alt, className }) => {
  const makeVariants = (original) => {
    try {
      const url = new URL(original, window.location.href).pathname;
      const enc = encodeURI(url);
      const lower = url.toLowerCase();
      const variants = new Set([original, url, enc, lower]);
      const exts = ['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];
      const match = url.match(/(.+)\.([a-zA-Z0-9]+)$/);
      if (match) {
        const base = match[1];
        exts.forEach(e => variants.add(base + '.' + e));
        exts.forEach(e => variants.add(encodeURI(base + '.' + e)));
      }
      return Array.from(variants);
    } catch {
      return [src];
    }
  };

  const variants = makeVariants(src);
  const [idx, setIdx] = useState(0);

  React.useEffect(() => setIdx(0), [src]);

  const onError = () => {
    if (idx + 1 < variants.length) setIdx(idx + 1);
    else setIdx(variants.length);
  };

  if (idx >= variants.length) {
    return <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3C/svg%3E" alt={alt} className={className} />;
  }

  return <img className={className} src={variants[idx]} alt={alt} onError={onError} loading="lazy" />;
};

const EventsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Replace eventOBJ with three cards: left TBA, center Trailblazers, right TBA
  const eventOBJ = [
    {
      id: 1,
      name: "To Be Announced",
      description: "Details coming soon. Stay tuned for upcoming events from VITERA.",
      bannerPath: "/images/coming.jpg",
      keyWords: ["TBA"],
      date: "TBA",
      imagesStrip1: [],
      imagesStrip2: [],
      featured: false
    },
    {
      id: 2,
      name: "TRAILBLAZERS QUESTS",
      description: `On February 21, 2025, VITERA organized its flagship event TRAILBLAZERS QUESTS at VIT Bhopal University. The event brought together 95 students in AB-420, creating an atmosphere filled with excitement, curiosity, and energy. Guided by the mentorship of Dr. Santosh K. Bhal and Dr. Sonjoy Pan, the day was designed to blend fun with learning and to remind everyone that social responsibility is a way of life.
      
The event featured four interactive games. Qriosity challenged participants to scan QR codes and solve puzzles based on social causes. Think Link connected pop culture clues to real-world issues. Popportunity combined the thrill of popping balloons with answering quizzes on awareness topics. Lens of Change encouraged students to reflect on real-life acts of kindness and sacrifice, sparking meaningful conversations.

A jamming session followed, transforming the hall into a lively concert space where students sang, clapped, and bonded. Winners were honored: Team Victorious Secret (1st), Team Jumanji (2nd), and Team Desi Kalakar (3rd). Beyond trophies and certificates, participants carried home memories of teamwork, creativity, and inspiration.

TRAILBLAZERS QUESTS proved that social awareness can be engaging, playful, and thought-provoking, reinforcing VITERA’s mission of making responsibility an everyday habit.`,
      bannerPath: "/images/Events_Pics/Trailblazers/1.webp",
      keyWords: ["Impact", "Community"],
      date: "August 22, 2025",
      imagesStrip1: [
        "/images/Events_Pics/Trailblazers/6.webp",
        "/images/Events_Pics/Trailblazers/7.webp",
        "/images/Events_Pics/Trailblazers/8.webp"
      ],
      imagesStrip2: [
        "/images/Events_Pics/Trailblazers/5.webp",
        "/images/Events_Pics/Trailblazers/4.webp",
        "/images/Events_Pics/Trailblazers/3.webp"
      ],
      featured: false
    },
    {
      id: 3,
      name: "To Be Announced",
      description: "Details coming soon. Stay tuned for upcoming events from VITERA.",
      bannerPath: "/images/coming.jpg",
      keyWords: ["TBA"],
      date: "TBA",
      imagesStrip1: [],
      imagesStrip2: [],
      featured: false
    }
  ];

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % eventOBJ.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + eventOBJ.length) % eventOBJ.length);
  };

  const getVisibleEvents = () => {
    const events = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % eventOBJ.length;
      events.push({ ...eventOBJ[index], displayIndex: i });
    }
    return events;
  };

  const handleEventClick = (eventId) => {
    console.log(`Navigate to event: ${eventId}`);
  };

  const handleViewEvent = (event) => {
    navigate(`/event/${encodeURIComponent(event.name)}`, {
      state: {
        title: event.name,
        description: event.description,
        imagesStrip1: event.imagesStrip1,
        imagesStrip2: event.imagesStrip2,
      }
    })};

  return (
    <div 
      ref={sectionRef}
      className="events-section"
    >
      <style>
      {`
        .events-section {
          min-height: 70vh;
          padding: 3rem 2rem;
          scroll-margin-top: 90px;
          background: transparent; /* Remove the background */
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .events-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          /* Softer, more blended gradient */
          background: radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 60%), 
                      radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .events-title {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 1rem;
          position: relative;
          z-index: 2;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : 30}px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .title-text {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          animation: ${isVisible ? 'titleGlow 3s ease-in-out infinite alternate' : 'none'};
        }

        .events-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2.5rem;
          max-width: 600px;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : 20}px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .slider-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : 40}px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
        }

        .events-slider {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          transform-style: preserve-3d;
          position: relative;
          z-index: 1;
          padding: 0 4rem;
        }

        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 107, 53, 0.9);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .slider-btn:hover {
          background: rgba(255, 107, 53, 1);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }

        .slider-btn.prev {
          left: 0;
        }

        .slider-btn.next {
          right: 0;
        }

        .event-card {
          width: 300px;
          height: 350px;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .event-card:nth-child(1) {
          transform: scale(0.9) translateX(-20px) rotateY(15deg);
          z-index: 1;
        }

        .event-card:nth-child(2) {
          transform: scale(1) translateX(0) rotateY(0deg);
          z-index: 3;
        }

        .event-card:nth-child(3) {
          transform: scale(0.9) translateX(20px) rotateY(-15deg);
          z-index: 1;
        }

        .event-card:hover {
          transform: scale(1.05) translateY(-10px) rotateY(0deg) !important;
          z-index: 10 !important;
        }

        .card-container {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event-card:hover .card-container {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 107, 53, 0.3);
          border-color: rgba(255, 107, 53, 0.4);
        }

        .card-image {
          width: 100%;
          height: 50%;
          position: relative;
          overflow: hidden;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(0.9) contrast(1.1);
        }

        .event-card:hover .banner-image {
          transform: scale(1.1) rotate(1deg);
          filter: brightness(1) contrast(1.2);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.8) 100%);
          opacity: 0.6;
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #1a1a2e;
          padding: 0.4rem 0.8rem;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          z-index: 3;
          animation: badgePulse 2s infinite;
        }

        .card-content {
          padding: 1.2rem;
          height: 40%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .event-keywords {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
        }

        .keyword {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          padding: 0.3rem 0.7rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }

        .keyword::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s;
        }

        .event-card:hover .keyword::before {
          left: 100%;
        }

        .event-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .event-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .view-event-btn {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 15px;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          align-self: flex-start;
        }

        .view-event-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .view-event-btn:hover::before {
          left: 100%;
        }

        .view-event-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .view-event-btn:hover .btn-icon {
          transform: translateX(2px);
        }

        @keyframes titleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.8));
          }
        }

        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .events-slider {
            padding: 0 3rem;
          }
          
          .event-card {
            width: 280px;
            height: 360px;
          }
        }

        @media (max-width: 768px) {
          .events-section {
            padding: 2rem 1rem;
            min-height: 60vh;
          }

          .events-slider {
            padding: 0 2rem;
            gap: 1rem;
          }

          .event-card {
            width: 250px;
            height: 340px;
          }

          .event-card:nth-child(1),
          .event-card:nth-child(3) {
            display: none;
          }

          .event-card:nth-child(2) {
            transform: scale(1) translateX(0) rotateY(0deg);
          }

          .slider-btn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .events-section {
            padding: 1.5rem 0.5rem;
          }

          .events-slider {
            padding: 0 1rem;
          }

          .event-card {
            width: 280px;
            height: 320px;
          }
        }
      `}
      </style>

      <div className="events-title">
        <span className="title-text">Events</span>
      </div>
      
      <div className="events-subtitle">
        Discover the impactful events that bring our VITERA community together
      </div>

      <div className="slider-container">
        <button className="slider-btn prev" onClick={prevSlide}>
          <ChevronLeft size={24} color="white" />
        </button>

        <div className="events-slider">
          {getVisibleEvents().map((event, index) => (
            <div
              key={`${event.id}-${currentIndex}`}
              className="event-card"
              onClick={() => handleEventClick(event.id)}
            >
              <div className="card-container">
                {event.featured && (
                  <div className="featured-badge">
                    <Star size={10} />
                    Featured
                  </div>
                )}
                
                <div className="card-image">
                  <SmartImage className="banner-image" src={event.bannerPath} alt={event.name} />
                  <div className="image-overlay" />
                </div>
                
                <div className="card-content">
                  <div>
                    <div className="event-keywords">
                      {event.keyWords.map((keyword, idx) => (
                        <div key={idx} className="keyword">
                          {keyword}
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="event-name">{event.name}</h3>
                    <p className="event-description">{event.desc}</p>
                  </div>
                  
                    <button
    className="view-event-btn"
    onClick={() => handleViewEvent(event)}
  >
    View Event
    <ArrowRight size={12} className="btn-icon" />
  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-btn next" onClick={nextSlide}>
          <ChevronRight size={24} color="white" />
        </button>
      </div>
    </div>
  );
};

export default EventsSection;