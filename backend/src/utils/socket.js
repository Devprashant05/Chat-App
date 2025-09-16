import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Creating new socket io server
const io = new Server(server, {
    cors: {
        origin:
            process.env.NODE_ENV === "development"
                ? "http://localhost:5173"
                : process.env.CORS_ORIGIN,
        credentials: true,
    },
});

export function getReceieverSocketId(userId) {
    return userSocketMap[userId];
}

// used to store online user
const userSocketMap = {};

// Whenever we want to listen socket sever we use on method

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    //getting user id from useAuthStore and save in userSocketMap object
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit is used to send event to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
