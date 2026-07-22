import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { FlashcardSet } from "../../domain/entities/FlashcardSet.entity";
import { IFlashcardSetRepository } from "../../domain/repositories/IFlashcardSetRepository";

import { FlashcardSetLean, FlashcardSetModel } from "../database/models/FlashcardSet";

import {
    toDomainFlashcardSet,
    toPersistenceFlashcardSet,
} from "../../application/mappers/FlashcardSetMapper";

import { BaseRepository } from "./BaseRepository";

export class FlashcardSetRepository
    extends BaseRepository<
        FlashcardSet,
        FlashcardSetLean
    >
    implements IFlashcardSetRepository {

    constructor() {
        super(
            FlashcardSetModel,
            toDomainFlashcardSet,
            toPersistenceFlashcardSet
        );
    }

    async getUserFlashcardSets(
        userId: string,
        page: number, 
        limit: number,
        search: string,
    ): Promise<
        PaginatedResponseDTO<FlashcardSet>
    > {

        const skip = (page - 1) * limit;

        const filter: Record<
            string,
            unknown
        > = {
            userId,
        };

        if (search?.trim()) {
            filter.topic = {
                $regex: search.trim(),
                $options: "i",
            };
        }

        const [sets, total] =
            await Promise.all([
                this._model
                    .find(filter)
                    .sort({
                        createdAt: -1,
                    })
                    .skip(skip)
                    .limit(limit)
                    .lean(),

                this._model.countDocuments(
                    filter
                ),
            ]);

        return {
            items: sets.map((set) =>
                this._toDomain(set)
            ),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findByUserAndId(
        userId: string,
        flashcardSetId: string
    ): Promise<
        FlashcardSet | null
    > {

        const set =
            await this._model
                .findOne({_id: flashcardSetId, userId})
                .lean();

        return set
            ? this._toDomain(set)
            : null;
    }
}