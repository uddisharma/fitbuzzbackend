const express = require("express");
const router = express.Router();
const CouponController = require("../controllers/CouponCodes.js");
router.post("/create-coupon", CouponController.createCoupon);
router.get("/coupons", CouponController.getCoupons);
router.delete("/delete-coupon/:id", CouponController.DeleteCoupon);
router.put("/update-coupon/:id", CouponController.UpdateCoupon);
module.exports = router;
