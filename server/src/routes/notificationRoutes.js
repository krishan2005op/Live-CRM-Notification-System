const express = require("express");
const router = express.Router();
const {
    getNotifications,
    markAsRead
} = require("../controllers/notificationController");

router.get("/:userId", getNotifications);
router.put("/read-all", markAsRead);
router.put("/:id/read", markAsRead);

module.exports = router;
