import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { logger, pinoLogger } from "./infrastructure/services/log/logger";
import { connectDB } from "./infrastructure/config/mongo.config";
import authRouter from './interfaces/routes/authRoutes';
import adminRouter from './interfaces/routes/adminRoutes';
import documentRouter from './interfaces/routes/documentRoutes';
import subscriptionRouter from './interfaces/routes/subscriptionRoutes';
import cookieParser from "cookie-parser";
import { errorHandler } from "./interfaces/middlewares/errorHandler";
import pinoHttp from "pino-http";
import { initializeSubscriptionJobs } from "./infrastructure/jobs/subscription.jobs";
const userApiRouter = express.Router();

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

userApiRouter.use("/auth", authRouter);
userApiRouter.use("/subscription", subscriptionRouter);
userApiRouter.use("/documents",  documentRouter);
app.use("/api/user", userApiRouter);
app.use("/api/admin", adminRouter);


app.use(errorHandler);

initializeSubscriptionJobs();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});