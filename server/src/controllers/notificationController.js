const Notification = require("../models/Notification");
const getNotifications = async (req, res) => {

    try {

        const { userId } = req.params;

        const notifications = await Notification.find({
            user: userId,
        }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            count: notifications.length,
            data: notifications,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};
const markAsRead = async (req, res) => {

    try {

        const notification =
            await Notification.findByIdAndUpdate(
                req.params.id,
                {
                    read: true,
                },
                {
                    new: true,
                }
            );

        if (!notification) {

            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });

        }

        res.json({
            success: true,
            message: "Notification marked as read",
            data: notification,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};
module.exports = {
    getNotifications,
    markAsRead,
};