import { DeleteFlashcardSetDTO } from "../../../dtos/flashcard/DeleteFlashcardSetDTO";

export interface IDeleteFlashcardSetUseCase {
    execute(data: DeleteFlashcardSetDTO): Promise<void>;
}