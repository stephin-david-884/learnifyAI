import { Request, Response } from "express";
import { IGenerateFlashcardsUseCase } from "../../../application/interfaces/usecases/flashcard/IGenerateFlashcardsUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { mapToGenerateFlashcardDTO } from "../../../application/mappers/flashcard/GenerateFlashcardMapper";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { flashcardMessages } from "../../../application/constants/messages/flashcardMessages";
import { mapToGetUserFlashcardSetsDTO } from "../../../application/mappers/flashcard/GetUserFlashcardMapper";
import { IGetUserFlashcardSetsUseCase } from "../../../application/interfaces/usecases/flashcard/IGetUserFlashcardSetsUseCase";
import { IGetFlashcardSetUseCase } from "../../../application/interfaces/usecases/flashcard/IGetFlashcardSetUseCase";
import { mapToGetFlashcardSetDTO } from "../../../application/mappers/flashcard/GetFlashcardMapper";
import { IDeleteFlashcardSetUseCase } from "../../../application/interfaces/usecases/flashcard/IDeleteFlashcardSetUseCase";
import { mapToDeleteFlashcardSetDTO } from "../../../application/mappers/flashcard/DeleteFlashcardMapper";

export class FlashcardController {

    constructor(
        private readonly _generateFlashcardsUseCase: IGenerateFlashcardsUseCase,
        private readonly _getUserFlashcardSetsUseCase: IGetUserFlashcardSetsUseCase,
        private readonly _getFlashcardSetUseCase: IGetFlashcardSetUseCase,
        private readonly _deleteFlashcardSetUseCase: IDeleteFlashcardSetUseCase,
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
    });

    getFlashcardSet = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGetFlashcardSetDTO(req);

        const flashcardSet = await this._getFlashcardSetUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            flashcardMessages.success.FLASHCARD_SET_FETCHED,
            flashcardSet
        )
    });

    deleteFlashcardSet = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToDeleteFlashcardSetDTO(req);

        await this._deleteFlashcardSetUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            flashcardMessages.success.FLASHCARD_SET_DELETED
        );
    })
}