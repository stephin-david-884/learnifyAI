import { Request } from "express";
import { GetFlashcardSetDTO } from "../../dtos/flashcard/GetFlashcardSetDTO";

export const mapToGetFlashcardSetDTO = (req: Request): GetFlashcardSetDTO => {

    const flashcardSetId = Array.isArray(req.params.flashcardSetId)
        ? req.params.flashcardSetId[0]
        : req.params.flashcardSetId

    return {
        userId: req.user.userId,
        flashcardSetId
    }
}