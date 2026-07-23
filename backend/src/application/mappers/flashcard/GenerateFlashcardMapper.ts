import { Request } from "express";
import { GenerateFlashcardDTO } from "../../dtos/flashcard/GenerateFlashcardDTO";

export const mapToGenerateFlashcardDTO = (req: Request): GenerateFlashcardDTO => {

    return {
        userId: req.user.userId,
        documentId: req.body.documentId,
        topic: req.body.topic,
        cardCount: req.body.cardCount
    };
}