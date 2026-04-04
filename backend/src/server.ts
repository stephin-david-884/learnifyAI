import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { logger } from "./infrastructure/services/log/logger";
import { connectDB } from "./infrastructure/config/mongo.config";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("LearnifyAI API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});