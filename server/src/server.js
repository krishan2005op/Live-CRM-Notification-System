require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const companyRoutes = require("./routes/companyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const connectDB = require("./config/db");
const { initSocket } = require("./socket/socket");
const assignmentRoutes = require("./routes/assignmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const { startReminderJob } = require("./cron/reminderJob");

const app = express();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "CRM Notification API Running"
    });
});

const server = http.createServer(app);

initSocket(server);
startReminderJob();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});