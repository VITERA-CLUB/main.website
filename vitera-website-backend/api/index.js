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

// Import QR System routes
import qrRoutes from './qr-routes.js';
import qrMockRoutes from './qr-mock-routes.js';

const PORTNO = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Enhanced MongoDB connection options
const mongoOptions = {
  serverSelectionTimeoutMS: 10000, // Increased from 5000
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1,
  retryWrites: true,
  retryReads: true,
};

let isConnecting = false;
let connectionPromise = null;

// Connect to MongoDB with promise caching
async function connectDB() {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  // If connection is in progress, wait for it
  if (isConnecting && connectionPromise) {
    console.log("⏳ Connection in progress, waiting...");
    return connectionPromise;
  }

  isConnecting = true;
  connectionPromise = (async () => {
    try {
      await mongoose.connect(MONGO_URL, mongoOptions);
      console.log("✅ MongoDB Connected Successfully");
      logConnectionStatus();
    } catch (err) {
      console.error("❌ MongoDB connection error:", err.message);
      // Don't retry immediately to avoid infinite loops
      setTimeout(() => {
        isConnecting = false;
        connectionPromise = null;
      }, 5000);
      throw err;
    } finally {
      isConnecting = false;
    }
  })();

  return connectionPromise;
}

// Initial connection attempt
connectDB().catch(err => console.error("Initial connection failed:", err.message));

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
  isConnecting = false;
  connectionPromise = null;
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Optional function to log current connection status
function logConnectionStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  console.log('📊 MongoDB connection state:', states[mongoose.connection.readyState]);
}

// Middleware to ensure DB connection before handling requests
async function ensureDBConnection(req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Failed to connect to DB:", error.message);
    res.status(503).json({ 
      message: "Database connection unavailable", 
      error: "Please try again in a few seconds" 
    });
  }
}

// QR System routes
app.use("/api/qr", qrRoutes);

// QR Mock routes (for testing without Google Sheets)
app.use("/api/qr-mock", qrMockRoutes);

// Feedback routes
app.post("/api/feedback", ensureDBConnection, async (req, res) => {
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

// Improved health check endpoint
app.get("/api/health", async (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState];
  
  // If not connected, try to connect
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (error) {
      console.error("Health check connection attempt failed:", error.message);
    }
  }

  // Perform a quick DB ping only if connected
  let dbPing = false;
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db.admin().ping();
      dbPing = true;
      console.log('💓 MongoDB keep-alive ping successful');
    } catch (error) {
      console.error("Health check ping failed:", error.message);
    }
  }

  const response = { 
    status: "ok", 
    database: dbState,
    dbPing: dbPing,
    timestamp: new Date().toISOString()
  };

  // Return 200 even if DB is connecting (not an error state)
  res.status(200).json(response);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed on SIGTERM');
  process.exit(0);
});

// Export the app for Vercel
export default app;

// If running locally, start the server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORTNO, () => console.log(`🚀 Server running on http://localhost:${PORTNO}`));
}
