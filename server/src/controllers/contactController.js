const Contact = require("../models/Contact");
const Company = require("../models/Company");

// Create Contact
const createContact = async (req, res) => {
    try {

        const {
            name,
            email,
            company,
        } = req.body;

        if (!name || !email || !company) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const companyExists = await Company.findById(company);

        if (!companyExists) {
            return res.status(404).json({
                message: "Company not found",
            });
        }

        const contact = await Contact.create({
            name,
            email,
            company,
        });

        const populated = await Contact.findById(contact._id)
            .populate("company");

        res.status(201).json(populated);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }
};

// Get Contacts
const getContacts = async (req, res) => {

    try {

        const contacts = await Contact.find()
            .populate("company")
            .sort({
                createdAt: -1,
            });

        res.json(contacts);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

module.exports = {
    createContact,
    getContacts,
};