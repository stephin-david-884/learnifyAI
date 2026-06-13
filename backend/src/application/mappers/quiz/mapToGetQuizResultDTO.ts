import { Request } from "express";
import { GetQuizDTO } from "../../dtos/quiz/GetQuizDTO";

export const mapToGetQuizResultDTO = (req: Request): GetQuizDTO => {

    const quizId = Array.isArray(req.params.quizId)
        ? req.params.quizId[0]
        : req.params.quizId;

    return {
        userId: req.user.userId,
        quizId
    }
}