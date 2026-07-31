const Company = require("../models/Company");

// Create Company
const createCompany = async (req, res) => {
    try {
        const { name, industry } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Company name is required",
            });
        }

        const company = await Company.create({
            name,
            industry,
        });

        res.status(201).json(company);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Get Companies
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({
            createdAt: -1,
        });

        res.json(companies);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    createCompany,
    getCompanies,
};