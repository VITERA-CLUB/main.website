import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Feedback from "../Feedback.js";
import Event from "../Event.js";  // Import the Event model
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

const PORTNO = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Connect MongoDB with detailed logging
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Optional function to log current connection status
function logConnectionStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  console.log('MongoDB connection state:', states[mongoose.connection.readyState]);
}

// Call the function once at startup
logConnectionStatus();

// Feedback routes
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving feedback", error });
  }
});

app.get("/api/feedback", async (req, res) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const requestOrigin = req.headers.origin;
  if (allowedOrigin && requestOrigin !== allowedOrigin) {
    return res.status(403).json({ message: "Forbidden: Not authorized" });
  }
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
});

// Event routes
app.get("/api/event", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

app.get("/api/event/:name", async (req, res) => {
  const eventName = req.params.name;
  try {
    const event = await Event.findOne({
      name: { $regex: new RegExp('^' + eventName + '$', 'i') }
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
});


app.post("/api/event", async (req, res) => {
  try {
    const { id, name, description, image, keywords, date, imagesStrip1, imagesStrip2 } = req.body;
    const newEvent = new Event({ id, name, description, image, keywords, date, imagesStrip1, imagesStrip2 });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});


app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Export the app for Vercel
export default app;

// If running locally, start the server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORTNO, () => console.log(`Server running on http://localhost:${PORTNO}`));
}
