import { GenerateFlashcardDTO, GenerateFlashcardResponseDTO } from "../../../dtos/flashcard/GenerateFlashcardDTO";

export interface IGenerateFlashcardsUseCase {

    execute(data: GenerateFlashcardDTO): Promise<GenerateFlashcardResponseDTO>;
}