import { AppError } from "../../../domain/errors/AppError";
import { IFlashcardSetRepository } from "../../../domain/repositories/IFlashcardSetRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { flashcardMessages } from "../../constants/messages/flashcardMessages";
import { DeleteFlashcardSetDTO } from "../../dtos/flashcard/DeleteFlashcardSetDTO";
import { IDeleteFlashcardSetUseCase } from "../../interfaces/usecases/flashcard/IDeleteFlashcardSetUseCase";

export class DeleteFlashcardSetUseCase implements IDeleteFlashcardSetUseCase {

    constructor(
        private readonly _flashcardSetRepository: IFlashcardSetRepository
    ){}

    async execute(data: DeleteFlashcardSetDTO): Promise<void> {
        
        const flashcardSet = await this._flashcardSetRepository.findByUserAndId(data.userId, data.flashcardSetId);

        if(!flashcardSet) {
            throw new AppError(flashcardMessages.error.FLASHCARD_NOT_FOUND, statusCode.NOT_FOUND);
        }

        await this._flashcardSetRepository.deleteById(flashcardSet.getId());
    }
}