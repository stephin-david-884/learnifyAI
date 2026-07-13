import { Request } from "express";

import { GetInterviewResultDTO } from "../../dtos/interview/GetInterviewResultDTO";

export const mapToGetInterviewResultDTO = (req: Request): GetInterviewResultDTO => {

    const interviewId = Array.isArray(req.params.interviewId)
        ? req.params.interviewId[0]
        : req.params.interviewId;

    return {

        userId: req.user.userId,
        interviewId,
    };
};