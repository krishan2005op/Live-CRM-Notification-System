const User = require("../models/User");

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ name: 1 });

        res.json({
            success: true,
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = { getUsers };