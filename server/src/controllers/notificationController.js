const Notification = require("../models/Notification");

// Get notifications for a specific user
const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const notifications = await Notification.find({ user: userId })
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            data: notifications
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Mark a single notification or all user notifications as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params; // Notification ID
        const { userId } = req.body; // In case we want to mark all as read

        if (id) {
            const notification = await Notification.findByIdAndUpdate(
                id,
                { read: true },
                { new: true }
            );

            if (!notification) {
                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });
            }

            return res.json({
                success: true,
                data: notification
            });
        } else if (userId) {
            await Notification.updateMany(
                { user: userId, read: false },
                { read: true }
            );

            return res.json({
                success: true,
                message: "All notifications marked as read"
            });
        }

        return res.status(400).json({
            success: false,
            message: "Notification ID or User ID is required"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getNotifications,
    markAsRead
};
