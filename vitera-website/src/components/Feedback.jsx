import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; //
import './FeedbackPage.css';

function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  // const navigate = useNavigate(); //

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://vitera.onrender.com/api/feedback", {
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
    }
  };

  return (
    <div className="feedback-page">
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

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
