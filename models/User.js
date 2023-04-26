// import mongoose from "mongoose";
const mongoose = require("mongoose");
// Defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  phone: { type: Number, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  photo: { type: String },
  alternatephone: { typ: Number },
  state: { type: String, trim: true },
  district: { type: String, trim: true },
  city: { type: String, trim: true },
  zipcode: { type: Number, trim: true },
  address: { type: String, trim: true },
});

// Model
const UserModel = mongoose.model("user", userSchema);

// export default UserModel;
module.exports = UserModel;
