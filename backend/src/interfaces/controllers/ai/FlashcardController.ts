import { Request, Response } from "express";
import { IGenerateFlashcardsUseCase } from "../../../application/interfaces/usecases/flashcard/IGenerateFlashcardsUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { mapToGenerateFlashcardDTO } from "../../../application/mappers/flashcard/flashcardMapper";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { flashcardMessages } from "../../../application/constants/messages/flashcardMessages";
import { mapToGetUserFlashcardSetsDTO } from "../../../application/mappers/flashcard/GetUserFlashcardMapper";
import { IGetUserFlashcardSetsUseCase } from "../../../application/interfaces/usecases/flashcard/IGetUserFlashcardSetsUseCase";

export class FlashcardController {

    constructor(
        private readonly _generateFlashcardsUseCase: IGenerateFlashcardsUseCase,
        private readonly _getUserFlashcardSetsUseCase: IGetUserFlashcardSetsUseCase,
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

    getUserFlashcardSets = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGetUserFlashcardSetsDTO(req);

        const result = await this._getUserFlashcardSetsUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            flashcardMessages.success.FLASHCARD_SETS_FETCHED,
            result
        );
    })
}