const Notification = require("../models/Notification");
const { getIO } = require("../socket/socket");

const sendNotification = async ({ user, title, message, entityType, entityId }) => {
    try {
        const notification = await Notification.create({
            user,
            title,
            message,
            entityType,
            entityId
        });

        // Emit through socket.io
        const io = getIO();
        if (io) {
            io.to(user.toString()).emit("notification", notification);
        }

        return notification;
    } catch (err) {
        console.error("Error sending notification:", err.message);
        throw err;
    }
};

module.exports = {
    sendNotification
};
