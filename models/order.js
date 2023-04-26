// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Order = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },
  alternatephone: {
    type: Number,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  order: {
    type: Array,
    required: true,
  },
  paymentmethod: {
    type: String,
    required: true,
  },

  amount:{
    type: Number,
    required: true,
  },
  OrderDate:{
    type: Date,
    default: Date.now,
  },
  DeliveryDate:{
    type: Date,
    default: Date.now,
  },
  status:{
    type: String,
    // required: true,
  },
  paymentID:{
  type:String,
  
  },
  orderID:{
    type:String,
    // required: true,
  },
  shipmentID:{
    type:String,
    // required: true,
  }
});

const OrderModel = new mongoose.model("Order", Order);
// export default CardModel;
module.exports = OrderModel;
