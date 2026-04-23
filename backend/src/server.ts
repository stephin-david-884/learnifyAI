import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { logger, pinoLogger } from "./infrastructure/services/log/logger";
import { connectDB } from "./infrastructure/config/mongo.config";
import authRouter from './interfaces/routes/authRoutes';
import cookieParser from "cookie-parser";
import { errorHandler } from "./interfaces/middlewares/errorHandler";
import pinoHttp from "pino-http";

const app = express();

app.use(
    pinoHttp({logger: pinoLogger})
)

connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", (req, res) => {
    res.send("LearnifyAI API is running");
});

app.use("/api/auth", authRouter)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});