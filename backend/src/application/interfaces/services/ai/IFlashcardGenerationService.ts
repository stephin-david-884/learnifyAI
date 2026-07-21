import { Flashcard } from "../../../../domain/entities/Flashcard.entity";

export interface IFlashcardGenerationService {

    generateFlashcards(context: string, topic: string, cardCount: number): Promise<Flashcard[]>;
}