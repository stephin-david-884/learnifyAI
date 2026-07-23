import { Request } from "express";
import { GetUserFlashcardSetsDTO } from "../../dtos/flashcard/GetUserFlashcardSetsDTO";

export const mapToGetUserFlashcardSetsDTO = (req: Request): GetUserFlashcardSetsDTO => {

    return {
        userId: req.user.userId,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search as string | undefined,
    }
}