import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Feedback from "../Feedback.js";
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

// Enhanced MongoDB connection with auto-reconnect
const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
};

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL, mongoOptions);
    console.log("✅ MongoDB Connected Successfully");
    logConnectionStatus();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
}

connectDB();

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Keep-alive ping function
async function keepAlive() {
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db.admin().ping();
      console.log('💓 MongoDB keep-alive ping successful');
    } catch (error) {
      console.error('❌ Keep-alive ping failed:', error);
    }
  } else {
    console.log('⚠️  MongoDB not connected, skipping ping');
  }
}

// Run keep-alive every 5 minutes (300000 ms)
setInterval(keepAlive, 300000);

// Optional function to log current connection status
function logConnectionStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  console.log('📊 MongoDB connection state:', states[mongoose.connection.readyState]);
}

// Feedback routes
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Error saving feedback", error: error.message });
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
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
});

// Health check endpoint (also acts as keep-alive when called)
app.get("/api/health", async (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState];
  
  // Perform a quick DB ping
  let dbPing = false;
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db.admin().ping();
      dbPing = true;
    } catch (error) {
      console.error("Health check ping failed:", error);
    }
  }

  res.json({ 
    status: "ok", 
    database: dbState,
    dbPing: dbPing,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

// Export the app for Vercel
export default app;

// If running locally, start the server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORTNO, () => console.log(`🚀 Server running on http://localhost:${PORTNO}`));
}
