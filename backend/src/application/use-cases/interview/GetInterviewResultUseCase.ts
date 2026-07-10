import { AppError } from "../../../domain/errors/AppError";
import { IInterviewRepository } from "../../../domain/repositories/IInterviewRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { interviewMessages } from "../../constants/messages/interviewMessages";
import { GetInterviewResultDTO } from "../../dtos/interview/GetInterviewResultDTO";
import { GetInterviewResultResponseDTO } from "../../dtos/interview/GetInterviewResultResponseDTO";
import { IGetInterviewResultUseCase } from "../../interfaces/usecases/interview/IGetInterviewResultUseCase";

export class GetInterviewResultUseCase implements IGetInterviewResultUseCase {

    constructor(
        private readonly _interviewRepository: IInterviewRepository,
    ) { }

    async execute(data: GetInterviewResultDTO): Promise<GetInterviewResultResponseDTO> {

        const interview = await this._interviewRepository
            .findByUserAndId(
                data.userId,
                data.interviewId
            );

        if (!interview) {

            throw new AppError(interviewMessages.error.INTERVIEW_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (
            interview.status !== "COMPLETED"
        ) {

            throw new AppError(interviewMessages.error.INTERVIEW_NOT_COMPLETED, statusCode.BAD_REQUEST
            );
        }

        return {

            interviewId:
                interview.getId(),

            overallScore:
                interview.overallScore,

            totalQuestions:
                interview.totalQuestions,

            review:
                interview.answers.map(
                    answer => ({

                        question:
                            answer.question,

                        transcript:
                            answer.transcript,

                        score:
                            answer.score,

                        feedback:
                            answer.feedback,

                        strengths:
                            answer.strengths,

                        improvements:
                            answer.improvements,
                    })
                ),
        };
    }
}