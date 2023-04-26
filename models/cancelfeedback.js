// import mongoose from "mongoose";
const mongoose = require("mongoose");
// Defining Schema
const feedbackSchema = new mongoose.Schema({
  reason: { type: String, required: true, trim: true },
  detailedreason: { type: String },
  product: {
    type: String,
    required: true,
  },
});

// Model
const feedbackModal = mongoose.model("cancelfeedback", feedbackSchema);

// export default adminModal;
module.exports = feedbackModal;
