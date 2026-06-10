import { IQuizRepository }
from "../../../domain/repositories/IQuizRepository";

import {
    GetUserQuizzesDTO,
} from "../../dtos/quiz/GetUserQuizzesDTO";

import {
    GetUserQuizzesResponseDTO,
} from "../../dtos/quiz/GetUserQuizzesResponseDTO";

import {
    IGetUserQuizzesUseCase,
} from "../../interfaces/usecases/quiz/IGetUserQuizzesUseCase";

export class GetUserQuizzesUseCase
implements IGetUserQuizzesUseCase {

    constructor(
        private readonly _quizRepository: IQuizRepository,
    ) {}

    async execute(
        data: GetUserQuizzesDTO
    ): Promise<GetUserQuizzesResponseDTO> {

        const result =
            await this._quizRepository
                .getUserQuizzes(
                    data.userId,
                    data.page ?? 1,
                    data.limit ?? 10
                );

        return {
            items: result.items.map(
                (quiz) => ({
                    id: quiz.getId(),

                    title: quiz.title,

                    generatedFromTopics: quiz.generatedFromTopics,

                    totalQuestions: quiz.totalQuestions,

                    score: quiz.score,

                    status: quiz.status,

                    createdAt: quiz.createdAt,
                })
            ),

            total: result.total,

            page: result.page,

            limit: result.limit,

            totalPages: result.totalPages,
        };
    }
}