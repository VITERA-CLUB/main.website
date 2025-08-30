import React from 'react';
import { useLocation } from 'react-router-dom';
import './EventsPage.css';

function EventsPage() {
  const { state } = useLocation();
  const {
    title = '', 
    description = '', 
    imagesStrip1 = [], 
    imagesStrip2 = []
  } = state || {};

  return (
    <div className="events-page">
      <div className="event-info">
        <h1 className="event-title">{title}</h1>
        <p className="event-desc">{description}</p>
      </div>
      <div className="event-images">
        <div className="scroll-strip scroll-strip-1">
          {imagesStrip1.map((img, idx) => (
            <img key={idx} src={img} alt={`Event img ${idx + 1}`} loading="lazy" />
          ))}
        </div>
        <div className="scroll-strip scroll-strip-2">
          {imagesStrip2.map((img, idx) => (
            <img key={idx} src={img} alt={`Event img ${idx + 1}`} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
