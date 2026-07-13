import { Request } from "express";
import { GenerateInterviewDTO } from "../../dtos/interview/GenerateInterviewDTO";

export const mapToGenerateInterviewDTO = ( req: Request): GenerateInterviewDTO => {

    return {

        userId: req.user.userId,

        documentId: req.body.documentId,

        title: req.body.title,

        topics: req.body.topics,

        questionCount: req.body.questionCount,

    };
};