import { Request } from "express";
import { GenerateAnswerDTO } from "../../dtos/chat/GenerateAnswerDTO";

export const mapToGenerateAnswerDTO = (req: Request): GenerateAnswerDTO => {

    return {
        userId: req.user.userId,
        documentId: req.body.documentId,
        question: req.body.question,
    };
};