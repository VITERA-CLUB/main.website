import React, { useEffect, useRef, useState } from "react";
import "./Winner.css";

const winnersData = [
  {
    date: "12 March 2025",
    event: "Glam VIT 3.0",
    winners: {
      first: { name: "Riya Patel", img: "https://i.pravatar.cc/100?img=32" },
      second: { name: "Aarav Shah", img: "https://i.pravatar.cc/100?img=12" },
      third: { name: "Kunal Mehta", img: "https://i.pravatar.cc/100?img=45" }
    }
  },
  {
    date: "28 February 2025",
    event: "Reel Factory",
    winners: {
      first: { name: "Yash Verma", img: "https://i.pravatar.cc/100?img=25" },
      second: { name: "Neha Joshi", img: "https://i.pravatar.cc/100?img=48" },
      third: { name: "Dhruv Rana", img: "https://i.pravatar.cc/100?img=16" }
    }
  }
];

export default function WinnersPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // 1. Intersection Observer for Card Fade-in
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => card && observer.observe(card));

    // 2. Scroll Listener for Timeline Path Drawing
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1) based on container position relative to viewport
      const progress = (windowHeight - rect.top) / (rect.height + windowHeight * 0.5);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="winners-page" ref={containerRef}>
      <header className="hero">
        <h1>Our Winners</h1>
        <p>Celebrating excellence and unforgettable performances</p>
      </header>

      <div className="timeline">
        {/* DYNAMIC SVG TIMELINE */}
        <svg className="curve-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
          {/* Background Path (Static) */}
          <path
            className="path-bg"
            d="M50 0 Q 70 250, 50 500 T 50 1000"
            vectorEffect="non-scaling-stroke"
          />
          {/* Progress Path (Animated) */}
          <path
            className="path-progress"
            d="M50 0 Q 70 250, 50 500 T 50 1000"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1 - scrollProgress,
            }}
          />
        </svg>

        {winnersData.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`event ${i % 2 === 0 ? "left" : "right"}`}
          >
            <div className="dot" />

            <div className="card">
              <span className="date">{item.date}</span>
              <h3>{item.event}</h3>

              <div className="podium">
                <div className="step silver">
                  <img src={item.winners.second.img} alt="Silver" />
                  <span>2</span>
                  <p>{item.winners.second.name}</p>
                </div>

                <div className="step gold">
                  <span className="crown">👑</span>
                  <img src={item.winners.first.img} alt="Gold" />
                  <span>1</span>
                  <p>{item.winners.first.name}</p>
                </div>

                <div className="step bronze">
                  <img src={item.winners.third.img} alt="Bronze" />
                  <span>3</span>
                  <p>{item.winners.third.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}