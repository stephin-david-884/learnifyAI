import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { chatController, quizController } from "../../infrastructure/di/ai.container";
import { validate } from "../middlewares/validate";
import { generateAnswerSchema } from "../validators/chat/chat.validator";
import { generateQuizSchema } from "../validators/quiz/generateQuiz.validator";

const router = express.Router();

router.get(ROUTES.CHAT.GET_CHAT,
    authMiddleware(tokenService),
    chatController.getChatHistory
);

router.post(ROUTES.CHAT.GENERATE_ANSWER,
    validate(generateAnswerSchema, "body"),
    authMiddleware(tokenService),
    chatController.generateAnswer
);

router.post(ROUTES.QUIZ.GENERATE_QUIZ,
    validate(generateQuizSchema, "body"),
    authMiddleware(tokenService),
    quizController.generateQuiz
);

router.get(ROUTES.QUIZ.GET_ALL,
    authMiddleware(tokenService),
    quizController.getUserQuizzes
);

router.get(ROUTES.QUIZ.GET_ONE,
    authMiddleware(tokenService),
    quizController.getQuiz
);

export default router;