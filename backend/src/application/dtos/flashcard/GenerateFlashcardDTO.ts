export interface GenerateFlashcardDTO {
    userId: string;

    documentId: string;

    topic: string;

    cardCount: number;
}

export interface GenerateFlashcardResponseDTO {
    flashcardSetId: string;
}