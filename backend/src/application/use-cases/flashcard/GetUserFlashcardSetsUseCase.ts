import { IFlashcardSetRepository } from "../../../domain/repositories/IFlashcardSetRepository";
import { GetUserFlashcardSetsDTO } from "../../dtos/flashcard/GetUserFlashcardSetsDTO";
import { GetUserFlashcardSetsResponseDTO } from "../../dtos/flashcard/GetUserFlashcardSetsResponseDTO";
import { IGetUserFlashcardSetsUseCase } from "../../interfaces/usecases/flashcard/IGetUserFlashcardSetsUseCase";

export class GetUserFlashcardSetsUseCase implements IGetUserFlashcardSetsUseCase {

    constructor(
        private readonly _flashcardSetRepository: IFlashcardSetRepository,
    ) {}

    async execute(data: GetUserFlashcardSetsDTO): Promise<GetUserFlashcardSetsResponseDTO> {
        
        const result = await this._flashcardSetRepository.getUserFlashcardSets(
            data.userId, 
            data.page ?? 1, 
            data.limit ?? 10, 
            data.search?? "",
        );

        return {
            items: result.items.map((set) => ({
                id: set.getId(),
                documentId: set.documentId,
                topic: set.topic,
                cardCount: set.cardCount,
                creditsUsed: set.creditsUsed,
                difficulties: [
                    ...new Set(
                        set.cards.map((card) => card.difficulty)
                    )
                ],
                createdAt: set.createdAt,
            })),
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages
        };
    }
}