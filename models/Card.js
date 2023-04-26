// import mongoose from "mongoose";
const mongoose = require("mongoose");
const makeCard = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  keywords: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  breadth: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const CardModel = new mongoose.model("Product", makeCard);
// export default CardModel;
module.exports = CardModel;
