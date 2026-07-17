import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { GetUserFlashcardSetsDTO } from "../../application/dtos/flashcard/GetUserFlashcardSetsDTO";
import { FlashcardSet } from "../entities/FlashcardSet.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IFlashcardSetRepository
    extends IBaseRepository<FlashcardSet> {

    getUserFlashcardSets(
        userId: string,
        query: GetUserFlashcardSetsDTO
    ): Promise<
        PaginatedResponseDTO<FlashcardSet>
    >;

    findByUserAndId(
        userId: string,
        flashcardSetId: string
    ): Promise<FlashcardSet | null>;
}