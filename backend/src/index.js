import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/index.js";
import { app, server } from "./utils/socket.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 5500;

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

connectDB()
    .then(() => {
        server.listen(port, (req, res) => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => console.error("Erro while connectin DB: ", error));
