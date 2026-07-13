import { Request } from "express";
import { CompleteInterviewDTO } from "../../dtos/interview/CompleteInterviewDTO";

export const mapToCompleteInterviewDTO = (req: Request): CompleteInterviewDTO => {

    const interviewId = Array.isArray(req.params.interviewId)
        ? req.params.interviewId[0]
        : req.params.interviewId;

    return {

        userId: req.user.userId,
        interviewId,
    };
};