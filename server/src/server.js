require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const companyRoutes = require("./routes/companyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const connectDB = require("./config/db");
const { initSocket } = require("./socket/socket");

const app = express();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use("/api/companies", companyRoutes);

app.use("/api/contacts", contactRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "CRM Notification API Running"
    });
});

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});