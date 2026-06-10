import { AppError } from "../../../domain/errors/AppError";

import { IQuizRepository }
    from "../../../domain/repositories/IQuizRepository";

import { IDocumentRepository }
    from "../../../domain/repositories/IDocumentRepository";

import { IDocumentChunkRepository }
    from "../../../domain/repositories/IDocumentChunkRepository";

import { Quiz }
    from "../../../domain/entities/Quiz.entity";

import { CREDIT_COSTS } from "../../constants/enums/creditCost";

import { statusCode, } from "../../constants/enums/statusCode";

import { GenerateQuizDTO, } from "../../dtos/quiz/GenerateQuizDTO";

import { GenerateQuizResponseDTO, } from "../../dtos/quiz/GenerateQuizResponseDTO";

import { IAICreditService, } from "../../interfaces/services/ai/IAICreditService";

import { IQuizGenerationService, } from "../../interfaces/services/ai/IQuizGenerationService";

import { IGenerateQuizUseCase, } from "../../interfaces/usecases/quiz/IGenerateQuizUseCase";
import { docMessages } from "../../constants/messages/docMessages";

export class GenerateQuizUseCase
    implements IGenerateQuizUseCase {

    constructor(
        private readonly _quizRepository: IQuizRepository,

        private readonly _documentRepository: IDocumentRepository,

        private readonly _documentChunkRepository: IDocumentChunkRepository,

        private readonly _quizGenerationService: IQuizGenerationService,

        private readonly _aiCreditService: IAICreditService,
    ) { }

    async execute(
        data: GenerateQuizDTO
    ): Promise<GenerateQuizResponseDTO> {

        const document =
            await this._documentRepository
                .findByUserAndId(
                    data.userId,
                    data.documentId
                );

        if (!document) {
            throw new AppError(docMessages.error.DOCUMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (document.status !== "READY") {
            throw new AppError(docMessages.error.DOCUMENT_NOT_READY, statusCode.BAD_REQUEST);
        }

        await this._aiCreditService.validateCredits(
            data.userId,
            CREDIT_COSTS.QUIZ
        );

        if (
            !data.topics ||
            data.topics.length === 0
        ) {
            throw new AppError("At least one topic is required", statusCode.BAD_REQUEST);
        }

        const availableTopics =
            document.topics.map(
                (topic) => topic.name
            );

        const invalidTopics =
            data.topics.filter(
                (topic) =>
                    !availableTopics.includes(topic)
            );

        if (invalidTopics.length > 0) {
            throw new AppError("Invalid topics selected", statusCode.BAD_REQUEST);
        }

        if (data.questionCount < data.topics.length) {
            throw new AppError("Question count must be greater than or equal to selected topics count", statusCode.BAD_REQUEST);
        }

        const chunks =
            await this._documentChunkRepository
                .findByDocumentAndTopics(
                    data.documentId,
                    data.topics
                );

        if (chunks.length === 0) {
            throw new AppError("No relevant content found for selected topics", statusCode.BAD_REQUEST);
        }

        const context =
            chunks
                .slice(0, 50)
                .map((chunk) => chunk.content)
                .join("\n\n");

        const questions =
            await this._quizGenerationService
                .generateQuiz(
                    context,
                    data.topics,
                    data.questionCount
                );

        if (questions.length === 0) {
            throw new AppError("Failed to generate quiz", statusCode.BAD_REQUEST);
        }

        const quiz =
            new Quiz({
                userId: data.userId,

                documentId: data.documentId,

                title:
                    data.title ??
                    `${document.title} Quiz`,

                generatedFromTopics: data.topics,

                questions,

                totalQuestions:
                    questions.length,

                score: 0,

                status: "READY",

                answers: [],
            });

        const savedQuiz =
            await this._quizRepository
                .save(quiz);

        await this._aiCreditService.consumeCredits(
            data.userId,
            CREDIT_COSTS.QUIZ
        );

        return {
            quizId:
                savedQuiz.getId(),
        };
    }
}