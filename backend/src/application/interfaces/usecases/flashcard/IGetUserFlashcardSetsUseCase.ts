import { GetUserFlashcardSetsDTO } from "../../../dtos/flashcard/GetUserFlashcardSetsDTO";
import { GetUserFlashcardSetsResponseDTO } from "../../../dtos/flashcard/GetUserFlashcardSetsResponseDTO";

export interface IGetUserFlashcardSetsUseCase {
    execute(data: GetUserFlashcardSetsDTO): Promise<GetUserFlashcardSetsResponseDTO>;
}