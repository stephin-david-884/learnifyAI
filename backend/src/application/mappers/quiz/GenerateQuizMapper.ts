import { Request } from "express";
import { GenerateQuizDTO } from "../../dtos/quiz/GenerateQuizDTO";

export const mapToGenerateQuizDTO = (
    req: Request
): GenerateQuizDTO => {

    return {
        userId: req.user.userId,

        documentId:
            req.body.documentId,

        title:
            req.body.title,

        topics:
            req.body.topics,

        questionCount:
            req.body.questionCount,
    };
};