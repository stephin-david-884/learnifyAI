import { IFlashcardSetRepository } from "../../../domain/repositories/IFlashcardSetRepository";
import { GetFlashcardSetDTO, GetFlashcardSetResponseDTO } from "../../dtos/flashcard/GetFlashcardSetDTO";
import { IGetFlashcardSetUseCase } from "../../interfaces/usecases/flashcard/IGetFlashcardSetUseCase";
import { AppError } from "../../../domain/errors/AppError";
import { flashcardMessages } from "../../constants/messages/flashcardMessages";
import { statusCode } from "../../constants/enums/statusCode";

export class GetFlashcardSetUseCase implements IGetFlashcardSetUseCase {

    constructor(
        private readonly  _flashcardSetRepository: IFlashcardSetRepository
    ){}

    async execute(data: GetFlashcardSetDTO): Promise<GetFlashcardSetResponseDTO> {
        
        const flashcardSet = await this._flashcardSetRepository.findByUserAndId(
            data.userId,
            data.flashcardSetId
        );

        if(!flashcardSet) {
            throw new AppError(flashcardMessages.error.FLASHCARD_NOT_FOUND, statusCode.NOT_FOUND);
        }

        return {
            id: flashcardSet.getId(),
            documentId: flashcardSet.documentId,
            topic: flashcardSet.topic,
            cardCount: flashcardSet.cardCount,
            creditsUsed: flashcardSet.creditsUsed,
            cards: flashcardSet.cards.map((card) => ({
                question: card.question,
                answer: card.answer,
                difficulty: card.difficulty,
            })),
            createdAt: flashcardSet.createdAt,
        }
    }
}