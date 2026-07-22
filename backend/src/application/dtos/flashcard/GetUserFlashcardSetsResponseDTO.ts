import { FlashcardDifficulty } from "../../../domain/entities/Flashcard.entity";

export interface FlashcardSetListItemDTO {
    id: string;
    documentId: string;
    topic: string;
    cardCount: number;
    creditsUsed: number;
    difficulties: FlashcardDifficulty[];
    createdAt?: Date;
}

export interface GetUserFlashcardSetsResponseDTO {
    items: FlashcardSetListItemDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}