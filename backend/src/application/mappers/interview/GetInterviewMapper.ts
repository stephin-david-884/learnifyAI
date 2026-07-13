import { Request } from "express";
import { GetInterviewDTO } from "../../dtos/interview/GetInterviewDTO";

export const mapToGetInterviewDTO = ( req: Request ): GetInterviewDTO => {

    const interviewId = Array.isArray(req.params.interviewId)
                            ? req.params.interviewId[0]
                            : req.params.interviewId;

    return {
        userId: req.user.userId,
        interviewId
    }                            
}