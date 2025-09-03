import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-container">
      <div className="footer-brand">
        <div className="footer-title-row">
          {/* Logo + title */}
          <a href="/" className="footer-logo-link" aria-label="Vitera Home">
            <img src="/vitera_logo.png" alt="VITERA Logo" className="footer-logo" />
          </a>
          <h2 className="footer-title">
            <span className="footer-title-orange">VITERA</span>
            <span className="footer-title-white"> Club</span>
          </h2>
        </div>
        <p className="footer-description">
          {/* replaced long description with a concise line */}
          Empowering students to learn, build and create meaningful impact.
        </p>

        {/* Feedback CTA box */}
        <div className="footer-cta">
          <div className="footer-cta-text">Have a suggestion? Help us improve Vitera.</div>
          <a className="footer-cta-btn" href="/feedback">Give Feedback</a>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Discover</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/team">Team</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Social</h4>
          <ul>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Us</h4>
          <div className="footer-contact-email">
            <a href="mailto:viteraclub@vitbhopal.ac.in">viteraclub@vitbhopal.ac.in</a>
          </div>
          <div className="footer-contact-address">
            <span>Kothri Kalan, Ashta, Near,</span>
            <span>Indore Road, Bhopal,</span>
            <span>Madhya Pradesh 466114</span>
          </div>

          {/* Embedded responsive map */}
          <div className="footer-map" aria-hidden="false">
            <iframe
              title="VITERA Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d648.8669027583876!2d76.8511581089216!3d23.07711880681602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ce9ceaaaaaaab%3A0xa224b6b82b421f83!2sVIT%20Bhopal%20University!5e0!3m2!1sen!2sin!4v1756882044901!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2025 Vitera Club. All rights reserved.</span>
    </div>
  </footer>
);
export default Footer;
