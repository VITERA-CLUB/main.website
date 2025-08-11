import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer id="feedback" className="footer-section">
    <div className="footer-container">
      <div className="footer-brand">
        <div className="footer-title-row">
          <h2 className="footer-title">
            <span className="footer-title-orange">VITERA</span>
            <span className="footer-title-white"> Club</span>
          </h2>
        </div>
        <p className="footer-description">
          Imagine a space where your ideas take shape, your curiosity is celebrated, and learning never stops. Vitera Club is where technology meets creativity, and members explore domains from AI to app development. We're here to spark innovation and build impactful projects that matter.
        </p>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Discover</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Social</h4>
          <ul>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
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
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2025 Vitera Club. All rights reserved.</span>
    </div>
  </footer>
);
export default Footer;
