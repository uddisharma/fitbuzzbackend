const express = require('express')
const router = express.Router();
const  CalcelFeedbackController= require('../controllers/cancelfeedbackcontroller.js');
router.post('/cancelfeedback', CalcelFeedbackController.CancelOrder);

module.exports = router;