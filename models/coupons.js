const mongoose = require("mongoose");
const coupons = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  code: { type: "string", required: true },
  discount: {
    type: Number,
    required: true,
  },
});
const CouponModel = new mongoose.model("coupon_code", coupons);
module.exports = CouponModel;
