import { AppError } from "../../../domain/errors/AppError";
import { IInterviewRepository } from "../../../domain/repositories/IInterviewRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { interviewMessages } from "../../constants/messages/interviewMessages";
import { CompleteInterviewDTO } from "../../dtos/interview/CompleteInterviewDTO";
import { CompleteInterviewResponseDTO } from "../../dtos/interview/CompleteInterviewResponseDTO";
import { IInterviewEvaluationService } from "../../interfaces/services/ai/IInterviewEvaluationService";
import { ICompleteInterviewUseCase } from "../../interfaces/usecases/interview/ICompleteInterviewUseCase";

export class CompleteInterviewUseCase implements ICompleteInterviewUseCase {

    constructor(

        private readonly _interviewRepository: IInterviewRepository,

        private readonly _evaluationService: IInterviewEvaluationService,
    ) { }

    async execute(data: CompleteInterviewDTO): Promise<CompleteInterviewResponseDTO> {

        const interview =
            await this._interviewRepository
                .findByUserAndId(
                    data.userId,
                    data.interviewId
                );

        if (!interview) {

            throw new AppError(interviewMessages.error.INTERVIEW_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (interview.answers.length === 0) {

            throw new AppError(interviewMessages.error.ANSWER_NOT_SUBMITTED, statusCode.BAD_REQUEST);
        }

        if (interview.status === "COMPLETED") {

            throw new AppError(interviewMessages.error.INTERVIEW_ALREADY_COMPLETED,statusCode.BAD_REQUEST);
        }

        const evaluatedAnswers =
            await this._evaluationService
                .evaluateInterview(
                    interview.answers
                );

        if (evaluatedAnswers.length === 0) {
            throw new AppError(interviewMessages.error.EVALUATION_FAILED, statusCode.SERVER_ERROR);
        }

        const overallScore =
            Math.round(evaluatedAnswers.reduce((sum, answer) => sum + answer.score, 0) / evaluatedAnswers.length);

        interview.completeInterview(

            evaluatedAnswers,

            overallScore
        );

        await this._interviewRepository
            .save(interview);

        return {

            interviewId:
                interview.getId(),
        };
    }
}