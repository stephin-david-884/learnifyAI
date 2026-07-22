import { GetFlashcardSetDTO, GetFlashcardSetResponseDTO } from "../../../dtos/flashcard/GetFlashcardSetDTO";

export interface IGetFlashcardSetUseCase {

    execute(data: GetFlashcardSetDTO): Promise<GetFlashcardSetResponseDTO>;
}