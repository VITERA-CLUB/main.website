import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventsPage.css';

function EventsPage() {
  const { eventName } = useParams() || {};
  const eventParam = eventName || decodeURIComponent(window.location.pathname.split('/event/')[1] || '');
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/event/${encodeURIComponent(eventParam)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Event not found');
        }
        return res.json();
      })
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [eventParam]);

  if (loading) return <div>Loading event data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event data available</div>;

  return (
    <div className="events-page">
      <div className="event-info">
        <h1 className="event-title">{event.name}</h1>
        <p className="event-desc">{event.description}</p>
      </div>
      <div className="event-images">
        <div className="scroll-strip scroll-strip-1">
          {event.imagesStrip1.map((img, idx) => (
            <img key={idx} src={img} alt={`Event img ${idx + 1}`} />
          ))}
        </div>
        <div className="scroll-strip scroll-strip-2">
          {event.imagesStrip2.map((img, idx) => (
            <img key={idx} src={img} alt={`Event img ${idx + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
