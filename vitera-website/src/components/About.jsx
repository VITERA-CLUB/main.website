import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <style jsx>{`
        .about-section {
          padding: 4rem 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(20, 20, 20, 0.90) 60%,
            rgba(255, 87, 34, 0.08) 100%
          );
        }
        .about-inner { max-width: 900px; margin: 0 auto; padding: 0 1rem; }
        .about-title { text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
        .about-text { color: var(--text-secondary); text-align: center; line-height: 1.75; max-width: 760px; margin: 0 auto; }
      `}</style>
      <div className="about-inner">
        <h2 className="about-title">About VITERA</h2>
        <p className="about-text">
          VITERA is a student-led community focused on learning by building. We host events, workshops,
          and projects across domains like AI, web, app, and design to help students grow together.
        </p>
      </div>
    </section>
  );
};

export default About;
