import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { dashboardController } from "../../infrastructure/di/dashboard.container";

const router = express.Router();

router.get(ROUTES.DASHBOARD.GET_SUMMARY,
    authMiddleware(tokenService),
    dashboardController.getDashboardSummary
);

export default router;