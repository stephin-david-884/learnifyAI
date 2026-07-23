import { Request } from "express";
import { DeleteFlashcardSetDTO } from "../../dtos/flashcard/DeleteFlashcardSetDTO";

export const mapToDeleteFlashcardSetDTO = (req: Request): DeleteFlashcardSetDTO => {

    const flashcardSetId = Array.isArray(req.params.flashcardSetId)
        ? req.params.flashcardSetId[0]
        : req.params.flashcardSetId;

    return {
        userId: req.user.userId,
        flashcardSetId
    }
}