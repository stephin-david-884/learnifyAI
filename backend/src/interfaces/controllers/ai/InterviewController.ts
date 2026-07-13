import { Request, Response } from "express";
import { IGenerateInterviewUseCase } from "../../../application/interfaces/usecases/interview/IGenerateInterviewUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { mapToGenerateInterviewDTO } from "../../../application/mappers/interview/GenerateInterviewMapper";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { interviewMessages } from "../../../application/constants/messages/interviewMessages";
import { IGetInterviewUseCase } from "../../../application/interfaces/usecases/interview/IGetInterviewUseCase";
import { mapToGetInterviewDTO } from "../../../application/mappers/interview/GetInterviewMapper";
import { IGetUserInterviewsUseCase } from "../../../application/interfaces/usecases/interview/IGetUserInterviewsUseCase";
import { mapToGetUserInterviewsDTO } from "../../../application/mappers/interview/GetUserInterviewsMapper";
import { ISubmitInterviewUseCase } from "../../../application/interfaces/usecases/interview/ISubmitInterviewUseCase";
import { mapToSubmitInterviewDTO } from "../../../application/mappers/interview/SubmitInterviewMapper";

export class InterviewController {

    constructor(
        private readonly _generateInterviewUseCase: IGenerateInterviewUseCase,
        private readonly _getInterviewUseCase: IGetInterviewUseCase,
        private readonly _getUserInterviewsUseCase: IGetUserInterviewsUseCase,
        private readonly _submitInterviewUseCase: ISubmitInterviewUseCase,
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
    });

    getInterview = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGetInterviewDTO(req);

        const interview = await this._getInterviewUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            interviewMessages.success.INTERVIEW_FETCHED,
            interview,
        )
    });

    getUserInterviews = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGetUserInterviewsDTO(req);

        const interviews = await this._getUserInterviewsUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            interviewMessages.success.INTERVIEWS_FETCHED,
            interviews,
        )
    });

    submitInterview = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToSubmitInterviewDTO(req);

        const interview = await this._submitInterviewUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            interviewMessages.success.INTERVIEW_SUBMITTED,
            interview
        );
    });
}