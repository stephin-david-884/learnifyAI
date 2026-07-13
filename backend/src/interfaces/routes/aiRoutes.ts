import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { chatController, interviewController, quizController } from "../../infrastructure/di/ai.container";
import { validate } from "../middlewares/validate";
import { generateAnswerSchema } from "../validators/chat/chat.validator";
import { generateQuizSchema } from "../validators/quiz/generateQuiz.validator";
import { submitQuizSchema } from "../validators/quiz/submitQuiz.validator";
import { generateInterviewSchema } from "../validators/interview/generateInterview.validator";

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

router.post(ROUTES.QUIZ.SUBMIT,
    validate(submitQuizSchema,"body"),
    authMiddleware(tokenService),
    quizController.submitQuiz
);

router.get(ROUTES.QUIZ.GET_QUIZ_RESULT,
    authMiddleware(tokenService),
    quizController.getQuizResult
);

router.post(ROUTES.INTERVIEW.GENERATE_INTERVIEW,
    validate(generateInterviewSchema, "body"),
    authMiddleware(tokenService),
    interviewController.generateInterview
);

export default router;