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
  bannerPath: "/images/Events Pics/TRAILBLAZERS/1.jpg",
  keyWords: ["Impact", "Community"],
  date: "August 22, 2025",
  imagesStrip1: [
    "/images/Events Pics/TRAILBLAZERS/6.jpg",
    "/images/Events Pics/TRAILBLAZERS/7.jpg",
    "/images/Events Pics/TRAILBLAZERS/8.jpg",
    "/images/Events Pics/TRAILBLAZERS/9.jpg",
    "/images/Events Pics/TRAILBLAZERS/10.jpg",
    "/images/Events Pics/TRAILBLAZERS/11.jpg",
  ],
  imagesStrip2: [
    "/images/Events Pics/TRAILBLAZERS/5.jpg",
    "/images/Events Pics/TRAILBLAZERS/4.jpg",
    "/images/Events Pics/TRAILBLAZERS/3.jpg",
    "/images/Events Pics/TRAILBLAZERS/2.jpg",
    "/images/Events Pics/TRAILBLAZERS/1.jpg",
  ],
  featured: false
}
  ];

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
                <img
                  src={event.bannerPath}
                  alt={event.name}
                  className="event-image"
                />
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
