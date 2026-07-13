import { Request, Response } from "express";
import { IGenerateInterviewUseCase } from "../../../application/interfaces/usecases/interview/IGenerateInterviewUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { mapToGenerateInterviewDTO } from "../../../application/mappers/interview/GenerateInterviewMapper";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { interviewMessages } from "../../../application/constants/messages/interviewMessages";

export class InterviewController {

    constructor(
        private readonly _generateInterviewUseCase: IGenerateInterviewUseCase
    ) {}

    generateInterview = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGenerateInterviewDTO(req);

        const interview = await this._generateInterviewUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.CREATED,
            interviewMessages.success.INTERVIEW_GENERATED,
            interview
        );
    })
}