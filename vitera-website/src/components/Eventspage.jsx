import React from 'react';
import { useLocation } from 'react-router-dom';
import './EventsPage.css';

// add a small inline SmartImage here as well
const SmartImage = ({ src, alt, ...props }) => {
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
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => setIdx(0), [src]);

  const onError = () => {
    if (idx + 1 < variants.length) setIdx(idx + 1);
    else setIdx(variants.length);
  };

  if (idx >= variants.length) return <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3C/svg%3E" alt={alt} {...props} />;

  return <img src={variants[idx]} alt={alt} onError={onError} loading="lazy" {...props} />;
};

function EventsPage() {
  const { state } = useLocation();
  const {
    title = '', 
    description = '', 
    imagesStrip1 = [], 
    imagesStrip2 = [],
    registrationLink = '',
    isOngoing = false,
  } = state || {};

  return (
    <div className="events-page">
      <div className="event-info">
        <h1 className="event-title">{title}</h1>
        
        {/* Registration button if event is ongoing */}
        {isOngoing && registrationLink && (
          <a 
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="event-register-btn"
          >
            Register Now
          </a>
        )}
        
        <div className="event-desc">
          {description.split('\n\n').filter(para => para.trim()).map((paragraph, i) => (
            <p key={i}>{paragraph.trim()}</p>
          ))}
        </div>
      </div>
      
      <div className="event-images">
        <div className="scroll-strip scroll-strip-1">
          {imagesStrip1.map((img, idx) => (
            <SmartImage key={idx} src={img} alt={`Event img ${idx + 1}`} />
          ))}
        </div>
        <div className="scroll-strip scroll-strip-2">
          {imagesStrip2.map((img, idx) => (
            <SmartImage key={idx} src={img} alt={`Event img ${idx + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
