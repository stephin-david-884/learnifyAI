import { toDomainSubscriptionPlan, toPersistenceSubscriptionPlan } from "../../application/mappers/SubscriptionPlanMapper";
import { SubscriptionPlan } from "../../domain/entities/SubscriptionPlan.entity";
import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlanRepository";
import { SubscriptionPlanlean, SubscriptionPlanModel } from "../database/models/SubscriptionPlan";
import { BaseRepository } from "./BaseRepository";

export class SubscriptionPlanRepository
    extends BaseRepository<SubscriptionPlan, SubscriptionPlanlean>
    implements ISubscriptionPlanRepository {

    constructor() {
        super(
            SubscriptionPlanModel,
            toDomainSubscriptionPlan,
            toPersistenceSubscriptionPlan
        )
    }

    async findActivePlans(): Promise<SubscriptionPlan[]> {
        const docs = await this._model.find({ isActive: true }).lean();
        return docs.map(this._toDomain);
    }

    async findByNameAndVersion(name: string, version: number): Promise<SubscriptionPlan | null> {
        const doc = await this._model
            .findOne({ name, version })
            .lean();

        return doc ? this._toDomain(doc) : null;
    }

    async findLatestVersionByName(name: string): Promise<SubscriptionPlan | null> {
        const doc = await this._model
            .findOne({ name })
            .sort({ version: -1 })
            .lean();

        return doc ? this._toDomain(doc) : null;
    }
}