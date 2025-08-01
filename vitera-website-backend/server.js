import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Feedback from "./Feedback.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORTNO = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ Connect MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// ✅ API Routes
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
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
});

const PORT = PORTNO;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
