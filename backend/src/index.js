import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/index.js";
import { app, server } from "./utils/socket.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import path from "path";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 5500;
const __dirname = path.resolve();

app.use(
    cors({
        origin:
            process.env.NODE_ENV === "development"
                ? "http://localhost:5173"
                : process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(port, () => {
    console.log("Server is running on Port: " + port);
    connectDB();
});
