import { Request } from "express";
import { SubmitInterviewDTO } from "../../dtos/interview/SubmitInterviewDTO";

export const mapToSubmitInterviewDTO = (req: Request): SubmitInterviewDTO => {

    const interviewId = Array.isArray(req.params.interviewId)
                            ? req.params.interviewId[0]
                            : req.params.interviewId;

    return {
        userId: req.user.userId,
        interviewId,
        answers:req.body.answers,
    }                            
}