import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventTimeline.css';

const events = [
    {
      id: 1,
      name: "Tech Innovation Summit",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, ligula a iaculis semper, magna sapien laoreet nisl, nec rhoncus leo sem sed lacus. Suspendisse potenti. Sed in quam nec arcu faucibus sodales. Donec consequat, purus at tincidunt faucibus, eros elit maximus lectus, at vestibulum mauris lorem vel nulla. Nam vitae diam eget arcu imperdiet sollicitudin. Praesent vulputate, mi sit amet fringilla porttitor, lacus odio porta libero, nec gravida mi erat sed mauris. Sed viverra, erat in feugiat luctus, erat urna aliquet est, in suscipit nulla turpis sed nulla. Etiam nec lorem ac dui facilisis finibus. Vestibulum a massa et dui commodo varius. Integer sed ex id metus ullamcorper cursus nec vel leo. Morbi aliquet tortor in odio sagittis laoreet. Curabitur in lorem sed nulla porttitor vehicula. Ut sed bibendum est. Aenean quis justo et eros tempor commodo. Vivamus vulputate dolor a tellus interdum, vel volutpat lorem sagittis. Proin euismod, elit ac fermentum fringilla, sapien sem posuere orci, nec egestas eros nisl vel ante. Integer tincidunt felis et ex rhoncus, ut pretium leo ultricies. Mauris eget mi nec risus feugiat fermentum.",
      bannerPath: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
      keyWords: ["Innovation", "Technology"],
      date: "August 15, 2025",
          imagesStrip1: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&auto=format"
    ],
      imagesStrip2: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=600&h=400&fit=crop&auto=format"
    ],
      featured: true
    },
    {
      id: 2,
      name: "Social Impact Workshop",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, ligula a iaculis semper, magna sapien laoreet nisl, nec rhoncus leo sem sed lacus. Suspendisse potenti. Sed in quam nec arcu faucibus sodales. Donec consequat, purus at tincidunt faucibus, eros elit maximus lectus, at vestibulum mauris lorem vel nulla. Nam vitae diam eget arcu imperdiet sollicitudin. Praesent vulputate, mi sit amet fringilla porttitor, lacus odio porta libero, nec gravida mi erat sed mauris. Sed viverra, erat in feugiat luctus, erat urna aliquet est, in suscipit nulla turpis sed nulla. Etiam nec lorem ac dui facilisis finibus. Vestibulum a massa et dui commodo varius. Integer sed ex id metus ullamcorper cursus nec vel leo. Morbi aliquet tortor in odio sagittis laoreet. Curabitur in lorem sed nulla porttitor vehicula. Ut sed bibendum est. Aenean quis justo et eros tempor commodo. Vivamus vulputate dolor a tellus interdum, vel volutpat lorem sagittis. Proin euismod, elit ac fermentum fringilla, sapien sem posuere orci, nec egestas eros nisl vel ante. Integer tincidunt felis et ex rhoncus, ut pretium leo ultricies. Mauris eget mi nec risus feugiat fermentum.",
      bannerPath: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Impact", "Community"],
      date: "August 22, 2025",
                imagesStrip1: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&auto=format"
    ],
      imagesStrip2: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=600&h=400&fit=crop&auto=format"
    ],
      featured: false
    },
    {
      id: 3,
      name: "Leadership Bootcamp",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, ligula a iaculis semper, magna sapien laoreet nisl, nec rhoncus leo sem sed lacus. Suspendisse potenti. Sed in quam nec arcu faucibus sodales. Donec consequat, purus at tincidunt faucibus, eros elit maximus lectus, at vestibulum mauris lorem vel nulla. Nam vitae diam eget arcu imperdiet sollicitudin. Praesent vulputate, mi sit amet fringilla porttitor, lacus odio porta libero, nec gravida mi erat sed mauris. Sed viverra, erat in feugiat luctus, erat urna aliquet est, in suscipit nulla turpis sed nulla. Etiam nec lorem ac dui facilisis finibus. Vestibulum a massa et dui commodo varius. Integer sed ex id metus ullamcorper cursus nec vel leo. Morbi aliquet tortor in odio sagittis laoreet. Curabitur in lorem sed nulla porttitor vehicula. Ut sed bibendum est. Aenean quis justo et eros tempor commodo. Vivamus vulputate dolor a tellus interdum, vel volutpat lorem sagittis. Proin euismod, elit ac fermentum fringilla, sapien sem posuere orci, nec egestas eros nisl vel ante. Integer tincidunt felis et ex rhoncus, ut pretium leo ultricies. Mauris eget mi nec risus feugiat fermentum.",
      bannerPath: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Leadership", "Growth"],
      date: "September 5, 2025",
                imagesStrip1: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&auto=format"
    ],
      imagesStrip2: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=600&h=400&fit=crop&auto=format"
    ],
      featured: false
    },
    {
      id: 4,
      name: "Clean Campus Initiative",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, ligula a iaculis semper, magna sapien laoreet nisl, nec rhoncus leo sem sed lacus. Suspendisse potenti. Sed in quam nec arcu faucibus sodales. Donec consequat, purus at tincidunt faucibus, eros elit maximus lectus, at vestibulum mauris lorem vel nulla. Nam vitae diam eget arcu imperdiet sollicitudin. Praesent vulputate, mi sit amet fringilla porttitor, lacus odio porta libero, nec gravida mi erat sed mauris. Sed viverra, erat in feugiat luctus, erat urna aliquet est, in suscipit nulla turpis sed nulla. Etiam nec lorem ac dui facilisis finibus. Vestibulum a massa et dui commodo varius. Integer sed ex id metus ullamcorper cursus nec vel leo. Morbi aliquet tortor in odio sagittis laoreet. Curabitur in lorem sed nulla porttitor vehicula. Ut sed bibendum est. Aenean quis justo et eros tempor commodo. Vivamus vulputate dolor a tellus interdum, vel volutpat lorem sagittis. Proin euismod, elit ac fermentum fringilla, sapien sem posuere orci, nec egestas eros nisl vel ante. Integer tincidunt felis et ex rhoncus, ut pretium leo ultricies. Mauris eget mi nec risus feugiat fermentum.",
      bannerPath: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Environment", "Campus"],
      date: "September 20, 2025",
                imagesStrip1: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&auto=format"
    ],
      imagesStrip2: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=600&h=400&fit=crop&auto=format"
    ],
      featured: false
    },
    {
      id: 5,
      name: "Mental Health Awareness",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, ligula a iaculis semper, magna sapien laoreet nisl, nec rhoncus leo sem sed lacus. Suspendisse potenti. Sed in quam nec arcu faucibus sodales. Donec consequat, purus at tincidunt faucibus, eros elit maximus lectus, at vestibulum mauris lorem vel nulla. Nam vitae diam eget arcu imperdiet sollicitudin. Praesent vulputate, mi sit amet fringilla porttitor, lacus odio porta libero, nec gravida mi erat sed mauris. Sed viverra, erat in feugiat luctus, erat urna aliquet est, in suscipit nulla turpis sed nulla. Etiam nec lorem ac dui facilisis finibus. Vestibulum a massa et dui commodo varius. Integer sed ex id metus ullamcorper cursus nec vel leo. Morbi aliquet tortor in odio sagittis laoreet. Curabitur in lorem sed nulla porttitor vehicula. Ut sed bibendum est. Aenean quis justo et eros tempor commodo. Vivamus vulputate dolor a tellus interdum, vel volutpat lorem sagittis. Proin euismod, elit ac fermentum fringilla, sapien sem posuere orci, nec egestas eros nisl vel ante. Integer tincidunt felis et ex rhoncus, ut pretium leo ultricies. Mauris eget mi nec risus feugiat fermentum.",
      bannerPath: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop&auto=format",
      keyWords: ["Health", "Awareness"],
      date: "October 10, 2025",
                imagesStrip1: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&auto=format"
    ],
      imagesStrip2: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=600&h=400&fit=crop&auto=format"
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
