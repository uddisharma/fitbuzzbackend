const CancelfeedbackModal = require("../models/cancelfeedback.js");

class CancelFeedbackController {
  static CancelOrder = async (req, res, next) => {
    try {
      const { reason, detailedreason, product } = req.body;
      const feedback = new CancelfeedbackModal({
        reason,
        detailedreason,
        product
      });
      feedback.save();
      res.status(200).send("Feedback saved");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
}
module.exports = CancelFeedbackController;
