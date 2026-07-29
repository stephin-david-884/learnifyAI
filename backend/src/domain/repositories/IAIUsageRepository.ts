import { AIUsageEvent } from "../entities/AIUsageEvent.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IAIUsageRepository
    extends IBaseRepository<AIUsageEvent> {

    findRecentFailures(
        limit: number
    ): Promise<AIUsageEvent[]>;

    findByUser(
        userId: string,
        limit?: number
    ): Promise<AIUsageEvent[]>;

    findByDocument(
        documentId: string
    ): Promise<AIUsageEvent[]>;
}   