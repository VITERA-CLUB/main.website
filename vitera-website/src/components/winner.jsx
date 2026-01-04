import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const winnersData = [
  {
    date: "21 February 2025",
    event: "TRAILBLAZERS QUESTS",
    eventImg: "/images/Events_Pics/Trailblazers/1.webp",
    type: "team",
    winners: {
      first: {
        name: "VICTORIOUS SECRET",
        members: ["Siddhi Gupta", "Vriti Yadav", "Drishti Tripathi", "Diya Sharma"]
      },
      second: {
        name: "JUMANJI",
        members: ["Charu Sinha", "SHAIK MOHAMMAD IRFAN", "Agrima Pandey", "Pasala Charishma"]
      },
      third: {
        name: "DESI KALAKAAR",
        members: ["MILAN PANWAR", "Tanishka kumari"]
      }
    }
  },
  {
    date: "2 January 2026",
    event: "Design for Good – Vitera Edition",
    eventImg: "/images/Events_Pics/DesignForGood/poster.jpg",
    type: "individual",
    winners: {
      first: {
        name: "Kethineni Venkata Avinash",
        img: "/images/Winner/Kethineni Venkata Avinash-1.png"
      },
      second: {
        name: "Rishi Kumar",
        img: "/images/Winner/Rishi Kumar 2.png"
      },
      third: {
        name: "Dhruba Samanta",
        img: "/images/Winner/Dhruba Samanta 3.png"
      }
    }
  },
  {
    date: "Coming Soon",
    event: "Next Big Event",
    eventImg: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    type: "upcoming",
    winners: {}
  }
];

export default function Winner() {
  const [lineHeight, setLineHeight] = useState(0);
  const [modalData, setModalData] = useState(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const openModal = (data) => setModalData(data);
  const closeModal = () => setModalData(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const progress = Math.max(
        0,
        Math.min(100, ((windowHeight - rect.top) / totalHeight) * 100)
      );
      setLineHeight(progress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="winners-page" ref={containerRef}>
      <header className="hero">
        <h1>Hall of Champions</h1>
        <p>
          A timeline of talent, teamwork, and triumph —
          where every winner leaves a mark that inspires the next.
        </p>
      </header>

      <div className="timeline-wrapper">
        <div className="center-line">
          <div className="line-fill" style={{ height: `${lineHeight}%` }} />
        </div>

        {winnersData.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`event-row ${i % 2 === 0 ? "left-align" : "right-align"}`}
          >
            <div className="timeline-dot" />

            <div className="content-box">
              <div className="card">
                <span className="date">{item.date}</span>

                <div className="card-header">
                  <img src={item.eventImg} alt="" className="event-logo" />
                  <h3>{item.event}</h3>
                </div>

                {item.type === "upcoming" ? (
                  <div className="podium upcoming-mode">
                    <div className="step silver"><span className="label">🥈 Your Name Here</span></div>
                    <div className="step gold"><span className="label">🥇 Waiting for a Champion</span></div>
                    <div className="step bronze"><span className="label">🥉 Next Legend</span></div>
                  </div>
                ) : (
                  <div className="podium team-mode">
                    {["second", "first", "third"].map((pos) => (
                      <div
                        key={pos}
                        className={`step ${
                          pos === "first"
                            ? "gold"
                            : pos === "second"
                            ? "silver"
                            : "bronze"
                        } clickable`}
                        onClick={() =>
                          openModal({
                            type: item.type,
                            rank:
                              pos === "first"
                                ? "🥇 First Place"
                                : pos === "second"
                                ? "🥈 Second Place"
                                : "🥉 Third Place",
                            name: item.winners[pos].name,
                            img: item.winners[pos].img,
                            members: item.winners[pos].members
                          })
                        }
                      >
                        {pos === "first" && <span className="crown">👑</span>}
                        <span className="rank">
                          {pos === "first" ? 1 : pos === "second" ? 2 : 3}
                        </span>
                        <p className="name">{item.winners[pos].name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalData && (
        <div className="winner-modal" onClick={closeModal}>
          <div
            className="winner-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>✕</button>

            <div className="modal-header">
              <span className="modal-rank">{modalData.rank}</span>
              <h3 className="modal-name">{modalData.name}</h3>
            </div>

            {modalData.type === "individual" && modalData.img && (
              <img src={modalData.img} alt={modalData.name} />
            )}

            {modalData.type === "team" && modalData.members && (
              <ul className="modal-members">
                {modalData.members.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
