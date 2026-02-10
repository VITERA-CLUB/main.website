import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventTimeline.css';

const events = [
    {
  id: 1,
  name: "TRAILBLAZERS QUESTS",
  description: `On February 21, 2025, VITERA organized its flagship event TRAILBLAZERS QUESTS at VIT Bhopal University. The event brought together 95 students in AB-420, creating an atmosphere filled with excitement, curiosity, and energy. Guided by the mentorship of Dr. Santosh K. Bhal and Dr. Sonjoy Pan, the day was designed to blend fun with learning and to remind everyone that social responsibility is a way of life.

The event featured four interactive games. Qriosity challenged participants to scan QR codes and solve puzzles based on social causes. Think Link connected pop culture clues to real-world issues. Popportunity combined the thrill of popping balloons with answering quizzes on awareness topics. Lens of Change encouraged students to reflect on real-life acts of kindness and sacrifice, sparking meaningful conversations.

A jamming session followed, transforming the hall into a lively concert space where students sang, clapped, and bonded. Winners were honored: Team Victorious Secret (1st), Team Jumanji (2nd), and Team Desi Kalakar (3rd). Beyond trophies and certificates, participants carried home memories of teamwork, creativity, and inspiration.

TRAILBLAZERS QUESTS proved that social awareness can be engaging, playful, and thought-provoking, reinforcing VITERA's mission of making responsibility an everyday habit.`,
  bannerPath: "/images/Events_Pics/Trailblazers/1.webp",
  keyWords: ["Impact", "Community"],
  date: "February 21, 2025",
  imagesStrip1: [
    "/images/Events_Pics/Trailblazers/6.jpeg",
    "/images/Events_Pics/Trailblazers/7.jpeg",
    "/images/Events_Pics/Trailblazers/8.jpeg",
    "/images/Events_Pics/Trailblazers/9.jpeg",
    "/images/Events_Pics/Trailblazers/10.jpeg",
    "/images/Events_Pics/Trailblazers/11.jpeg",
  ],
  imagesStrip2: [
    "/images/Events_Pics/Trailblazers/5.jpeg",
    "/images/Events_Pics/Trailblazers/4.jpeg",
    "/images/Events_Pics/Trailblazers/3.jpeg",
    "/images/Events_Pics/Trailblazers/2.webp",
    "/images/Events_Pics/Trailblazers/12.jpeg",
  ],
  featured: false
},
  {
    id: 2,
    name: "Design for Good – Vitera Edition",
    description: `Design for Good – Vitera Edition is a FREE online creative contest that encourages students to use design and storytelling to highlight social issues and inspire positive change. This event invites participants to create powerful posters based on social issues, real-life stories, or impactful statistics.

Open to all students, this contest offers an exciting opportunity to showcase creative skills while making a meaningful impact. Participants can win creator perks including guided Canva Pro access, portfolio features, and premium design resources — all at zero cost. E-Certificates will be awarded to all participants, and the best entries will be featured as Vitera Impact Stories on the official website with creator credits.

The contest is conducted entirely online, making it accessible to students from anywhere. Registration and submission are completely free, with the deadline set for 2nd January 2026, 11:59 PM. Winners and shortlisted entries will be officially announced on Vitera Club's Instagram, LinkedIn, and official website.

Design for Good represents Vitera's commitment to empowering students to become voices for change, using creativity as a tool for social awareness and positive transformation.`,
    bannerPath: "/images/Events_Pics/DesignForGood/poster.jpg",
    keyWords: ["Design", "Social Impact", "Creativity"],
    date: "January 2, 2026",
    imagesStrip1: [
      "/images/Events_Pics/DesignForGood/poster.jpg",
      "/images/Winner/winners/1.jpeg",
      "/images/Winner/winners/2.jpeg",
      "/images/Winner/winners/3.jpeg",
    ],
    imagesStrip2: [
      "/images/Winner/winners/4.jpeg",
      "/images/Winner/winners/5.jpeg",
      "/images/Events_Pics/DesignForGood/poster.jpg",
    ],
    submissions: [
      "/images/Winner/winners/1.jpeg",
      "/images/Winner/winners/2.jpeg",
      "/images/Winner/winners/3.jpeg",
      "/images/Winner/winners/4.jpeg",
      "/images/Winner/winners/5.jpeg",
      "/images/Winner/winners/6.jpeg",
      "/images/Winner/winners/7.jpeg",
      "/images/Winner/winners/8.jpeg",
      "/images/Winner/winners/9.jpeg",
      "/images/Winner/winners/10.jpeg",
      "/images/Winner/winners/11.jpeg",
      "/images/Winner/winners/12.jpeg",
      "/images/Winner/winners/13.jpeg",
      "/images/Winner/winners/14.jpeg",
      "/images/Winner/winners/15.jpeg",
      "/images/Winner/winners/16.jpeg",
    ],
    featured: false,
    registrationLink: "https://forms.gle/wBne8LZgBbKq31Aj8", // Replace with actual form link
    isOngoing: false
  },
  {
    id: 3,
    name: "The House of Royals",
    description: 'The House of Royals is where competition meets celebration Step into an action-packed arena featuring exciting games like Stack-E-Cups, Match the Cups, Musical Chairs, Balloon Flip, and the thrilling Break the Tower Challenge, where speed, focus, and fun earn you royal stamps.As the games conclude, Hour 3 kicks off with an energetic DJ session that keeps the vibe alive.The spotlight then shifts to a confident and stylish Ramp Walk, where participants own the stage.Capture the moments at the Polaroid Photo Booth and take home instant royal memories.The event wraps up with a grand Crowning Ceremony, celebrating creativity, style, and true royal spirit ✨',
    bannerPath: "/images/Events_Pics/The-House-of-Royals/poster.jpeg", // replace with an actual placeholder image in public/images
    keyWords: ["FashionShow", "DJ-Party"],
    date: "February 27, 2026",
    imagesStrip1: [],
    imagesStrip2: [],
    featured: true,
    registrationLink: "https://forms.gle/5RuRtvWPANtHfcQj9", // Add actual link
    isOngoing: true
  },
  {
    id: 4,
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
    } catch (error) {
      console.error("Error in makeVariants:", error);
      return [original];
    }
  };
  const [srcSet, setSrcSet] = useState(makeVariants(src));
  const [idx, setIdx] = useState(0);

  const onError = () => {
    if (idx < srcSet.length) {
      setIdx(idx + 1);
    }
  };

  return (
    <picture>
      {srcSet.length > 0 ? (
        <img src={srcSet[idx]} alt={alt} className={className} onError={onError} loading="lazy" />
      ) : (
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3C/svg%3E" alt={alt} className={className} />
      )}
    </picture>
  );
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
        registrationLink: event.registrationLink,
        isOngoing: event.isOngoing,
        submissions: event.submissions, // Add submissions
      },
    });
  };

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
                <p className="event-description">{event.description.split(" ").slice(0, 10).join(" ")}...</p>
                <div className="event-actions">
                  <button className="view-btn" onClick={() => handleViewEvent(event)}>View Event</button>
                  {event.isOngoing && event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="register-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Register Now
                    </a>
                  )}
                </div>
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

