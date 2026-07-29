import { toDomainAIUsageEvent, toPersistenceAIUsageEvent } from "../../application/mappers/AIUsageEvent.mapper";
import { AIUsageEvent } from "../../domain/entities/AIUsageEvent.entity";
import { IAIUsageRepository } from "../../domain/repositories/IAIUsageRepository";
import {
    AIUsageEventLean,
    AIUsageEventModel,
} from "../database/models/AIUsageEvent";
import { BaseRepository } from "./BaseRepository";

export class AIUsageRepository
    extends BaseRepository<
        AIUsageEvent,
        AIUsageEventLean
    >
    implements IAIUsageRepository {

    constructor() {

        super(
            AIUsageEventModel,
            toDomainAIUsageEvent,
            toPersistenceAIUsageEvent
        );
    }

    async findRecentFailures(
        limit: number
    ): Promise<AIUsageEvent[]> {

        const events = await this._model
            .find({status: "FAILED",})
            .sort({createdAt: -1,})
            .limit(limit)
            .lean();

        return events.map(
            (event) => this._toDomain(event)
        );
    }

    async findByUser(
        userId: string,
        limit = 100
    ): Promise<AIUsageEvent[]> {

        const events = await this._model
            .find({userId})
            .sort({createdAt: -1})
            .limit(limit)
            .lean();

        return events.map(
            (event) => this._toDomain(event)
        );
    }

    async findByDocument(
        documentId: string
    ): Promise<AIUsageEvent[]> {

        const events = await this._model
            .find({documentId})
            .sort({createdAt: -1})
            .lean();

        return events.map(
            (event) => this._toDomain(event)
        );
    }
}