import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { chatController } from "../../infrastructure/di/ai.container";
import { validate } from "../middlewares/validate";
import { generateAnswerSchema } from "../validators/chat/chat.validator";

const router = express.Router();

router.get(ROUTES.CHAT.GET_CHAT,
    authMiddleware(tokenService),
    chatController.getChatHistory
);

router.post(ROUTES.CHAT.GENERATE_ANSWER,
    validate(generateAnswerSchema, "body"),
    authMiddleware(tokenService),
    chatController.generateAnswer
)

export default router;