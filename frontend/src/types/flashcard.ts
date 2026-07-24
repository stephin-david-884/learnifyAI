export type FlashcardDifficulty = 
    | "EASY"
    | "MEDIUM"
    | "HARD";

export interface GenerateFlashcardPayload {
    documentId: string;
    topic: string;
    cardCount: 5 | 10;
}    

export interface GenerateFlashcardResponse {
    flashcardSetId: string;
}

export interface Flashcard {
    question: string;

    answer: string;

    difficulty: FlashcardDifficulty;
}

export interface FlashcardSet {
    id: string;

    documentId: string;

    topic: string;

    cardCount: number;

    creditsUsed: number;

    cards: Flashcard[];

    createdAt?: string;
}

export interface FlashcardSetListItem {
    id: string;

    documentId: string;

    topic: string;

    cardCount: number;

    creditsUsed: number;

    difficulties: FlashcardDifficulty[];

    createdAt?: string;
}

export interface GetUserFlashcardSetsResponse {
    items: FlashcardSetListItem[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;
}

export interface FlashcardState {
    flashcardSets: FlashcardSetListItem[];

    currentFlashcardSet: FlashcardSet | null;

    loading: boolean;

    generating: boolean;

    deleting: boolean;

    error: string | null;

    page: number;

    limit: number;

    totalPages: number;

    total: number;
}