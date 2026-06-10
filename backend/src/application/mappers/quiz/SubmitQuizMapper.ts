import { Request } from "express";

import {
    SubmitQuizDTO,
} from "../../dtos/quiz/SubmitQuizDTO";

export const mapToSubmitQuizDTO = (
    req: Request
): SubmitQuizDTO => {

    const quizId = Array.isArray(req.params.quizId)
        ? req.params.quizId[0]
        : req.params.quizId;

    return {
        userId:
            req.user.userId,

        quizId,

        answers:
            req.body.answers,
    };
};