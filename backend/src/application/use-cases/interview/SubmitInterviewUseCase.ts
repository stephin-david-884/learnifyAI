import { AppError } from "../../../domain/errors/AppError";
import { IInterviewRepository } from "../../../domain/repositories/IInterviewRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { interviewMessages } from "../../constants/messages/interviewMessages";
import { SubmitInterviewDTO } from "../../dtos/interview/SubmitInterviewDTO";
import { SubmitInterviewResponseDTO } from "../../dtos/interview/SubmitInterviewResponseDTO";
import { ISubmitInterviewUseCase } from "../../interfaces/usecases/interview/ISubmitInterviewUseCase";

export class SubmitInterviewUseCase implements ISubmitInterviewUseCase {

    constructor(
        private readonly _interviewRepository: IInterviewRepository
    ) { }

    async execute(data: SubmitInterviewDTO): Promise<SubmitInterviewResponseDTO> {

        const interview =
            await this._interviewRepository
                .findByUserAndId(
                    data.userId,
                    data.interviewId
                );

        if (!interview) {

            throw new AppError(interviewMessages.error.INTERVIEW_NOT_FOUND, statusCode.NOT_FOUND);
        }

        // if ( interview.status !== "READY" ) {

        //     throw new AppError( interviewMessages.error.INTERVIEW_NOT_READY, statusCode.BAD_REQUEST);
        // }

        if (data.answers.length !== interview.totalQuestions) {

            throw new AppError(interviewMessages.error.INVALID_ANSWER_SUB, statusCode.BAD_REQUEST);
        }

        const answers =
            interview.questions.map(
                (question, index) => {

                    const submitted = data.answers.find( answer => answer.questionIndex === index );

                    return {

                        questionIndex: index,

                        question:
                            question.question,

                        difficulty:
                            question.difficulty,

                        transcript:
                            submitted?.transcript ?? "",

                        score: 0,

                        feedback: "",

                        strengths: [],

                        improvements: [],
                    };
                }
            );

        interview.submitAnswers(
            answers,
        );

        await this._interviewRepository.save(interview);

        return {

            interviewId:
                interview.getId(),
        };
    }
}