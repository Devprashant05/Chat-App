import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 5500;

connectDB()
    .then(() => {
        app.listen(port, (req, res) => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => console.error("Erro while connectin DB: ", error));
