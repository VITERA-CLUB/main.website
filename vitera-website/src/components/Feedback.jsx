import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; //
import './FeedbackPage.css';

function Feedback() {
  // Use API base URL from .env and append endpoint (Vite syntax)
  const API_URL = `${import.meta.env.VITE_API_URL}/api/feedback`;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); //

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting to:", API_URL); // Debug log

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, feedback }),
      });

      if (response.ok) {
        alert("Thank you for your feedback!");
        setName("");
        setEmail("");
        setFeedback("");
        // navigate('/'); // 
      } else {
        alert("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      {/* Loading Modal */}
      {loading && (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <div>Submitting...</div>
        </div>
      )}
      <div className="background-logo"></div>
      <div className="feedback-container">
        <h2>Feedback & Suggestions</h2>
        <p>We’d love to hear your thoughts, suggestions, or feedback!</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Your Feedback</label>
          <textarea
            placeholder="Share your thoughts..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
