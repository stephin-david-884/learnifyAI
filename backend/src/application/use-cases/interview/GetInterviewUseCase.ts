import { AppError } from "../../../domain/errors/AppError";
import { IInterviewRepository } from "../../../domain/repositories/IInterviewRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { interviewMessages } from "../../constants/messages/interviewMessages";
import { GetInterviewDTO } from "../../dtos/interview/GetInterviewDTO";
import { GetInterviewResponseDTO } from "../../dtos/interview/GetInterviewResponseDTO";
import { IGetInterviewUseCase } from "../../interfaces/usecases/interview/IGetInterviewUseCase";

export class GetInterviewUseCase implements IGetInterviewUseCase {

    constructor(
        private readonly _interviewRepository: IInterviewRepository
    ) { }

    async execute(data: GetInterviewDTO): Promise<GetInterviewResponseDTO> {

        const interview = await this._interviewRepository.findByUserAndId(data.userId, data.interviewId);

        if (!interview) {
            throw new AppError(interviewMessages.error.INTERVIEW_NOT_FOUND, statusCode.NOT_FOUND);
        }

        return {

            id: interview.getId(),

            title: interview.title,

            generatedFromTopics:
                interview.generatedFromTopics,

            totalQuestions:
                interview.totalQuestions,

            questions:
                interview.questions.map(
                    question => ({

                        question:
                            question.question,

                        difficulty:
                            question.difficulty,
                    })
                ),

            status:
                interview.status,

            createdAt:
                interview.createdAt,
        };
    }
}