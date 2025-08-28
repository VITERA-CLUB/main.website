import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {         // Event description
    type: String,
    default: "",
  },
  image: {                // Main banner image URL
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    required: true,
  },
  imagesStrip1: {
    type: [String],       // Array of image URLs for strip 1
    default: [],
  },
  imagesStrip2: {
    type: [String],       // Array of image URLs for strip 2
    default: [],
  }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
