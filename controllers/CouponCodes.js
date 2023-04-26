const CouponModel = require("../models/coupons.js");

class CouponController {
  static createCoupon = async (req, res) => {
    const {category,code, discount } = req.body;
    try {
      const coupon = new CouponModel({
        category: category,
        code: code,
        discount: discount,
      });
      coupon.save();
      res.status(200).send("created coupon");
    } catch (error) {
      res.status(404).send("failed to create coupon");
    }
  };
  static getCoupons = async (req, res) => {
    try {
      const coupons = await CouponModel.find();
      res.status(200).send(coupons);
    } catch (error) {
      res.status(404).send("failed to get coupons");
    }
  };
  static DeleteCoupon = async (req, res) => {
    try {
      const coupon = await CouponModel.findByIdAndDelete(req.params.id);
      res.status(200).send("deleted coupon");
    } catch (error) {
      res.status(404).send("failed to delete coupon");
    }
  };
  static UpdateCoupon = async (req, res) => {
    try {
      const coupon = await CouponModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("updated coupon");
    } catch (error) {
      res.status(404).send("failed to update coupon");
    }
  };
}
module.exports =CouponController
