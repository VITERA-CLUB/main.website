import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventTimeline.css';

const events = [
    {
  id: 1,
  name: "TRAILBLAZERS QUESTS",
  description: `On February 21, 2025, VITERA organized its flagship event TRAILBLAZERS QUESTS at VIT Bhopal University. The event brought together 95 students in AB-420, creating an atmosphere filled with excitement, curiosity, and energy. Guided by the mentorship of Dr. Santosh K. Bhal and Dr. Sonjoy Pan, the day was designed to blend fun with learning and to remind everyone that social responsibility is a way of life.
\n
The event featured four interactive games. Qriosity challenged participants to scan QR codes and solve puzzles based on social causes. Think Link connected pop culture clues to real-world issues. Popportunity combined the thrill of popping balloons with answering quizzes on awareness topics. Lens of Change encouraged students to reflect on real-life acts of kindness and sacrifice, sparking meaningful conversations.
\n
A jamming session followed, transforming the hall into a lively concert space where students sang, clapped, and bonded. Winners were honored: Team Victorious Secret (1st), Team Jumanji (2nd), and Team Desi Kalakar (3rd). Beyond trophies and certificates, participants carried home memories of teamwork, creativity, and inspiration.
\n
TRAILBLAZERS QUESTS proved that social awareness can be engaging, playful, and thought-provoking, reinforcing VITERA’s mission of making responsibility an everyday habit.`,
  bannerPath: "/images/Events_Pics/Trailblazers/1.webp",
  keyWords: ["Impact", "Community"],
  date: "August 22, 2025",
  imagesStrip1: [
    "/images/Events_Pics/Trailblazers/6.webp",
    "/images/Events_Pics/Trailblazers/7.webp",
    "/images/Events_Pics/Trailblazers/8.webp",
    "/images/Events_Pics/Trailblazers/9.webp",
    "/images/Events_Pics/Trailblazers/10.webp",
    "/images/Events_Pics/Trailblazers/11.webp",
  ],
  imagesStrip2: [
    "/images/Events_Pics/Trailblazers/5.webp",
    "/images/Events_Pics/Trailblazers/4.webp",
    "/images/Events_Pics/Trailblazers/3.webp",
    "/images/Events_Pics/Trailblazers/2.webp",
    "/images/Events_Pics/Trailblazers/12.webp",
  ],
  featured: false
},
  {
    id: 2,
    name: "To Be Announced",
    description: "Details coming soon. Stay tuned for upcoming events from VITERA.",
    bannerPath: "/images/coming.jpg", // replace with an actual placeholder image in public/images
    keyWords: ["TBA"],
    date: "TBA",
    imagesStrip1: [],
    imagesStrip2: [],
    featured: false
  }
  ];

const SmartImage = ({ src, alt, className }) => {
  const makeVariants = (original) => {
    try {
      const url = new URL(original, window.location.href).pathname;
      const enc = encodeURI(url);
      const lower = url.toLowerCase();
      const variants = new Set([original, url, enc, lower]);

      // try common extensions
      const exts = ['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];
      const match = url.match(/(.+)\.([a-zA-Z0-9]+)$/);
      if (match) {
        const base = match[1];
        exts.forEach(e => variants.add(base + '.' + e));
        // also add encoded variants
        exts.forEach(e => variants.add(encodeURI(base + '.' + e)));
      }
      return Array.from(variants);
    } catch {
      return [src];
    }
  };

  const variants = makeVariants(src);
  const [idx, setIdx] = useState(0);

  // reset when src changes
  React.useEffect(() => {
    setIdx(0);
  }, [src]);

  const onError = () => {
    if (idx + 1 < variants.length) setIdx(idx + 1);
    else setIdx(variants.length); // mark as failed
  };

  if (idx >= variants.length) {
    // final fallback: tiny transparent placeholder to avoid broken icon
    return <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3C/svg%3E" alt={alt} className={className} />;
  }

  return <img src={variants[idx]} alt={alt} className={className} onError={onError} loading="lazy" />;
};

const EventTimeline = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
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
    <div className="timeline-container">
      <h1 className="timeline-title">Event Timeline</h1>
      <div className="timeline">
        {events.map((event) => (
          <div
            key={event.id}
            className={`timeline-item${hovered === event.id ? ' hovered' : ''}`}
            onMouseEnter={() => setHovered(event.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="timeline-date">
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="timeline-content">
<div className="timeline-main">
  <SmartImage src={event.bannerPath} alt={event.name} className="event-image" />
  <div>
                  <h2 className="event-name">{event.name}</h2>
                  {!hovered && (
                    <p className="event-short">
                      {event.description.split('. ')[0]}.
                    </p>
                  )}
                </div>
              </div>
              {hovered === event.id && (
                <div className="event-details">
                  <p className="event-description">{event.description.split(" ").slice(0, 10).join(" ")}</p>
                  <button className="view-btn" onClick={() => handleViewEvent(event)}>View Event</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;
