const Assignment = require("../models/Assignment");
const User = require("../models/User");
const Company = require("../models/Company");
const Contact = require("../models/Contact");

// Create Assignment
const createAssignment = async (req, res) => {
    try {

        const {
            user,
            entityType,
            entityId,
            role,
            assignedBy
        } = req.body;

        // Validation
        if (
            !user ||
            !entityType ||
            !entityId ||
            !role ||
            !assignedBy
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // User exists?
        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Assigned By exists?
        const admin = await User.findById(assignedBy);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "AssignedBy user not found"
            });
        }

        // Company / Contact exists?
        if (entityType === "company") {

            const company = await Company.findById(entityId);

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found"
                });
            }

        } else {

            const contact = await Contact.findById(entityId);

            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: "Contact not found"
                });
            }

        }

        // Prevent duplicate assignment
        const duplicate = await Assignment.findOne({
            user,
            entityType,
            entityId,
            role
        });

        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: "Assignment already exists"
            });
        }

        const assignment = await Assignment.create({
            user,
            entityType,
            entityId,
            role,
            assignedBy
        });

        const populated = await Assignment.findById(
            assignment._id
        )
            .populate("user")
            .populate("assignedBy");

        return res.status(201).json({
            success: true,
            message: "Assignment created successfully",
            data: populated
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const getAssignments = async (req, res) => {

    try {

        const assignments = await Assignment.find()

            .populate("user")

            .populate("assignedBy")

            .sort({
                createdAt: -1
            });

        return res.json({
            success: true,
            count: assignments.length,
            data: assignments
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    createAssignment,
    getAssignments
};