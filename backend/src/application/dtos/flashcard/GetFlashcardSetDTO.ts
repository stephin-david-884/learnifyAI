import { FlashcardDifficulty } from "../../../domain/entities/Flashcard.entity";

export interface GetFlashcardSetDTO {
    userId: string;

    flashcardSetId: string;
}

export interface FlashcardDTO {
    question: string;

    answer: string;

    difficulty: FlashcardDifficulty;
}

export interface GetFlashcardSetResponseDTO {

    id: string;

    documentId: string;

    topic: string;

    cardCount: number;

    creditsUsed: number;

    cards: FlashcardDTO[];

    createdAt?: Date;
}