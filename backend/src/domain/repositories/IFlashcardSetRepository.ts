import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { FlashcardSet } from "../entities/FlashcardSet.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IFlashcardSetRepository
    extends IBaseRepository<FlashcardSet> {

    getUserFlashcardSets(
        userId: string,
        page: number, 
        limit: number,
        search: string,
    ): Promise<
        PaginatedResponseDTO<FlashcardSet>
    >;

    findByUserAndId(
        userId: string,
        flashcardSetId: string
    ): Promise<FlashcardSet | null>;
}