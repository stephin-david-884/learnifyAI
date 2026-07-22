import { Request, Response } from "express";
import { IGenerateFlashcardsUseCase } from "../../../application/interfaces/usecases/flashcard/IGenerateFlashcardsUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { mapToGenerateFlashcardDTO } from "../../../application/mappers/flashcard/flashcardMapper";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { flashcardMessages } from "../../../application/constants/messages/flashcardMessages";

export class FlashcardController {

    constructor(
        private readonly _generateFlashcardsUseCase: IGenerateFlashcardsUseCase,
    ) {}

    generateFlashcards = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGenerateFlashcardDTO(req);

        const result = await this._generateFlashcardsUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.CREATED,
            flashcardMessages.success.FLASHCARDS_GENERATED,
            result
        );
    });
}