import { Request } from "express";
import { StartInterviewDTO } from "../../dtos/interview/StartInterviewDTO";

export const mapToStartInterviewDTO = (req: Request): StartInterviewDTO => {

    const interviewId =
        Array.isArray(req.params.interviewId)
            ? req.params.interviewId[0]
            : req.params.interviewId;

    return {

        userId: req.user.userId,
        interviewId,
    };
};