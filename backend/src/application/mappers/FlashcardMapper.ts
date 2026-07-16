import { Flashcard } from "../../domain/entities/Flashcard.entity";
import { IFlashcard } from "../../infrastructure/database/models/FlashcardSet";

export const toDomainFlashcards = (cards: IFlashcard[]): Flashcard[] => {

    return cards.map(
        (card) =>
            new Flashcard({
                question: card.question,
                answer: card.answer,
                difficulty: card.difficulty,
            })
    );
};

export const toPersistenceFlashcards = (cards: Flashcard[]): IFlashcard[] => {

    return cards.map((card) => ({
        question: card.question,
        answer: card.answer,
        difficulty: card.difficulty,
    }));
};