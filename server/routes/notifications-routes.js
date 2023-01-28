const express = require("express");
const {
  pushNotification,
  markAsRead,
  getNotifications,
  approvalNotification,
} = require("../controllers/notifController");
const authmiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/pushNotification", pushNotification);
router.post("/approvalNotification", approvalNotification);
router.patch("/markasread/:id", markAsRead);
router.get("/usernotifications", authmiddleware, getNotifications);

module.exports = router;
