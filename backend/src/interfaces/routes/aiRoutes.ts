import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { chatController } from "../../infrastructure/di/ai.container";

const router = express.Router();

router.get(ROUTES.CHAT.GET_CHAT,
    authMiddleware(tokenService),
    chatController.getChatHistory
)

export default router;