import { Flashcard } from "../../../domain/entities/Flashcard.entity";
import { FlashcardSet } from "../../../domain/entities/FlashcardSet.entity";
import { AppError } from "../../../domain/errors/AppError";
import { IDocumentChunkRepository } from "../../../domain/repositories/IDocumentChunkRepository";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { IFlashcardSetRepository } from "../../../domain/repositories/IFlashcardSetRepository";
import { CREDIT_COSTS } from "../../constants/enums/creditCost";
import { statusCode } from "../../constants/enums/statusCode";
import { docMessages } from "../../constants/messages/docMessages";
import { flashcardMessages } from "../../constants/messages/flashcardMessages";
import { GenerateFlashcardDTO, GenerateFlashcardResponseDTO } from "../../dtos/flashcard/GenerateFlashcardDTO";
import { IAICreditService } from "../../interfaces/services/ai/IAICreditService";
import { IFlashcardGenerationService } from "../../interfaces/services/ai/IFlashcardGenerationService";
import { IGenerateFlashcardsUseCase } from "../../interfaces/usecases/flashcard/IGenerateFlashcardsUseCase";

export class GenerateFlashcardsUseCase implements IGenerateFlashcardsUseCase {

    constructor(

        private readonly _flashcardSetRepository: IFlashcardSetRepository,
        private readonly _documentRepository: IDocumentRepository,
        private readonly _documentChunkRepository: IDocumentChunkRepository,
        private readonly _flashcardAIService: IFlashcardGenerationService,
        private readonly _aiCreditService: IAICreditService,
    ) { }

    async execute(data: GenerateFlashcardDTO): Promise<GenerateFlashcardResponseDTO> {

        const document = await this._documentRepository.findByUserAndId(data.userId, data.documentId);

        if (!document) {
            throw new AppError(docMessages.error.DOCUMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (document.status !== "READY") {
            throw new AppError(docMessages.error.DOCUMENT_NOT_READY, statusCode.BAD_REQUEST);
        }

        const creditCost = data.cardCount === 5 ? CREDIT_COSTS.FLASHCARDS_5 : CREDIT_COSTS.FLASHCARDS_10;

        await this._aiCreditService.validateCredits(data.userId, creditCost);

        const topicExists = document.topics.some((topic) => topic.name === data.topic);

        if (!topicExists) {
            throw new AppError("Invalid topics selected", statusCode.BAD_REQUEST);
        }

        const chunks = await this._documentChunkRepository.findByDocumentAndTopics(data.documentId, [data.topic]);

        if (chunks.length === 0) {
            throw new AppError("No relevant content found for selected topic", statusCode.BAD_REQUEST);
        }

        const context = chunks.slice(0, 50)
            .map((chunk) => chunk.content)
            .join("\n\n");

        const generatedCards = await this._flashcardAIService.generateFlashcards(
            context,
            data.topic,
            data.cardCount
        );

        if (generatedCards.length === 0) {
            throw new AppError(flashcardMessages.error.FLASHCARD_FAILED, statusCode.BAD_REQUEST);
        }

        const cards = generatedCards.map((card) => new Flashcard({
            question: card.question,
            answer: card.answer,
            difficulty: card.difficulty
        }));

        const flashcardSet = new FlashcardSet({
            userId: data.userId,
            documentId: data.documentId,
            topic: data.topic,
            cardCount: cards.length,
            creditsUsed: creditCost,
            cards,
        });

        const savedSet = await this._flashcardSetRepository.save(flashcardSet);

        await this._aiCreditService.consumeCredits(data.userId, creditCost);

        return {
            flashcardSetId: savedSet.getId(),
        }
    }
}