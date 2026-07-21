export interface GenerateFlashcardDTO {
    userId: string;

    documentId: string;

    topic: string;

    cardCount: 5 | 10;
}

export interface GenerateFlashcardResponseDTO {
    flashcardSetId: string;
}