import { AppError } from "../../../domain/errors/AppError";

import { IQuizRepository } from "../../../domain/repositories/IQuizRepository";

import { statusCode, } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { quizMessages } from "../../constants/messages/quizMessages";

import { GetQuizDTO, } from "../../dtos/quiz/GetQuizDTO";

import { GetQuizResponseDTO, } from "../../dtos/quiz/GetQuizResponseDTO";

import { IGetQuizUseCase, } from "../../interfaces/usecases/quiz/IGetQuizUseCase";

export class GetQuizUseCase
    implements IGetQuizUseCase {

    constructor(
        private readonly _quizRepository: IQuizRepository,
    ) { }

    async execute(data: GetQuizDTO): Promise<GetQuizResponseDTO> {

        const quiz = await this._quizRepository.findById(data.quizId);

        if (!quiz) {
            throw new AppError(quizMessages.error.QUIZ_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (quiz.userId !== data.userId) {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

        return {
            id: quiz.getId(),

            title: quiz.title,

            generatedFromTopics:
                quiz.generatedFromTopics,

            totalQuestions:
                quiz.totalQuestions,

            questions:
                quiz.questions.map(
                    (question) => ({
                        question:
                            question.question,

                        options:
                            question.options,

                        difficulty:
                            question.difficulty,
                    })
                ),

            score:
                quiz.score,

            status:
                quiz.status,

            completedAt:
                quiz.completedAt,

            createdAt:
                quiz.createdAt,
        };
    }
}