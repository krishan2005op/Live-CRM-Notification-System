const { Server } = require("socket.io");

let io;

const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("Socket Connected:", socket.id);

        socket.on("join", (userId) => {

            socket.join(userId);

            console.log(`User ${userId} joined room`);

        });

        socket.on("disconnect", () => {

            console.log("Disconnected:", socket.id);

        });

    });

};

const getIO = () => io;

module.exports = {
    initSocket,
    getIO
};