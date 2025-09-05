import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Instagram } from 'lucide-react';
import './About.css';

const faculty = [
  { name: 'Dr. Santosh Kumar Bhal', role: 'Faculty Coordinator', img: '/images/faculty/santosh.webp' },
  { name: 'Dr. Sonjoy Pan', role: 'Faculty Coordinator', img: '/images/faculty/sonjoy.webp' },
  // ...add more faculty if needed
];

const About = () => {
  return (
    <main className="about-section container">
      <header className="about-hero">
        <div className="about-hero-inner">
          <h1>About VITERA</h1>
          <p className="about-sub">Student-led. Socially-minded. Community-first.</p>
          <p className="about-cta"><Link to="/" className="btn btn-secondary">Back to Home</Link></p>
        </div>
      </header>

      <section className="about-content">
        <div className="about-text">
          <h2>Who we are</h2>
          <p>
            VITERA is a student-led club at VIT Bhopal University committed to fostering social
            awareness, strengthening social conscience, and creating meaningful change. Believing
            that social responsibility is a defining quality, we unite like-minded individuals to
            address pressing issues through dialogue, action, and collaboration.
          </p>
          <p>
            At Vitera, we harness the power to unite through teamwork and a social mindset to bring
            to life the ideas of social responsibility, community wellness and social welfare.
            Our spirit is rooted in the idea of the people, for the people, and by the people. We
            bring together individuals with similar values and provide them a platform to do
            something greater than one can do alone.
          </p>
          <p>
            We take ideas, whether they start as a casual thought or a late-night debate, and turn
            them into events and initiatives that leave something behind: a changed perspective, a
            better system, a community that feels a little more connected. VITERA isn’t just about
            doing good, it’s about building an era where doing good is second nature — a community
            of togetherness; welcoming a new era of social responsibility and building a mindset of
            community wellness.
          </p>
        </div>
      </section>

      <section className="leadership-section container">
        <h2 className="leadership-title">Leadership</h2>
        <div className="leadership-grid">
          <div className="lead-card">
            <img src="/images/Our Team/Panel/lakshya.webp" alt="President" className="lead-img" />
            <div className="lead-body">
              <h3>Lakshya Pandey</h3>
              <div className="lead-role">Founder & President</div>
              <p>
                "At VITERA, we believe in the power of collective action. Every initiative we take is a step
                towards building a more conscious and responsible community. Our mission is to inspire
                and empower students to become agents of positive change."
              </p>
              <div className="lead-social">
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className="social-link" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                 <a href="#" target="_blank" rel="noopener noreferrer"
                   className="social-link" title="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="lead-card">
            <img src="/images/Our Team/Panel/spandan.webp" alt="Vice President" className="lead-img" />
            <div className="lead-body">
              <h3>Spandan Agrawal</h3>
              <div className="lead-role">Founder & Vice President</div>
              <p>
                "VITERA is more than just a club; it's a movement towards creating meaningful impact.
                We focus on innovative approaches to social responsibility, making it engaging and
                accessible for everyone in our community."
              </p>
              <div className="lead-social">
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className="social-link" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className="social-link" title="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faculty-section">
        <h2>Faculty Coordinators</h2>
        <p className="faculty-sub">Guiding and mentoring the club</p>

        <div className="faculty-grid">
          {faculty.map((f, i) => (
            <div className="faculty-card" key={i}>
              <div className="faculty-img-wrap">
                <img src={f.img} alt={f.name} />
              </div>
              <div className="faculty-info">
                <strong>{f.name}</strong>
                <span>{f.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
