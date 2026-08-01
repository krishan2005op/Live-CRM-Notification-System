const Notification = require("../models/Notification");
const { getIO } = require("../socket/socket");
const createNotification = async ({
    user,
    title,
    message,
    entityType,
    entityId,
}) => {

    const notification = await Notification.create({
        user,
        title,
        message,
        entityType,
        entityId,
    });

    const io = getIO();

    io.to(user.toString()).emit("newNotification", notification);

    return notification;
};

module.exports = {
    createNotification,
};