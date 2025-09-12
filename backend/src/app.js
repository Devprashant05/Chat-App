import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

const app = express();

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

export default app;
