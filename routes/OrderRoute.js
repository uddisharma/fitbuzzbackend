const express = require("express");
// import adminController from "../controllers/admincontroller.js";
const orderController = require("../controllers/ordercontroller");
const router = express.Router();
router.post("/addorder", orderController.SendOrders);
router.get("/orders", orderController.GetOrders);
router.get("/orders/:email", orderController.UserOrders);
router.get("/order/:id", orderController.OrderbyId);
router.patch("/order/:id", orderController.UpdateOrder);
router.delete("/order/:id", orderController.DeleteOrder);
router.patch('/update-status/:id', orderController.updateStatus);
module.exports = router;
