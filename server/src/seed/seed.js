require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

const User = require("../models/User");

const seed = async () => {
    try {
        await connectDB();

        await User.deleteMany();

        await User.insertMany([
            {
                name: "Admin",
                email: "admin@test.com",
                isAdmin: true,
            },
            {
                name: "Alice",
                email: "alice@test.com",
            },
            {
                name: "Bob",
                email: "bob@test.com",
            },
        ]);

        console.log("Users Seeded");

        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
};

seed();