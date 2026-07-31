const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        entityType: {
            type: String,
            enum: ["company", "contact"],
            required: true,
        },

        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        role: {
            type: String,
            enum: [
                "Owner",
                "Manager",
                "Viewer",
            ],
            required: true,
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Assignment", assignmentSchema);