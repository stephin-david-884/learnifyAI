import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { GetAllSubscriptionPlansDTO } from "../../application/dtos/subscription/get-all-subscription-plans.dto";
import { GetAvailablePlansDTO } from "../../application/dtos/subscription/get-available-plans.dto";
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

    async findActivePlans(query: GetAvailablePlansDTO): Promise<PaginatedResponseDTO<SubscriptionPlan>> {
        const {page, limit} = query;

        const skip = (page-1) * limit;

        const filter = {isActive: true};

        const [docs, total] = await Promise.all([
            this._model
                .find(filter)
                .sort({price:1})
                .skip(skip)
                .limit(limit)
                .lean(),

            this._model.countDocuments(filter),
        ]);

        return {
            items: docs.map((doc) => this._toDomain(doc)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit),
        };
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

    async findActivePlansByName(name: string): Promise<SubscriptionPlan[]> {

        const docs = await this._model
            .find({
                name,
                isActive: true
            })
            .lean();

        return docs.map(doc => this._toDomain(doc));
    }

    async getAdminPlans(query: GetAllSubscriptionPlansDTO): Promise<PaginatedResponseDTO<SubscriptionPlan>> {

        const { page, limit, search, isActive, billingCycle, sortBy = "createdAt", sortOrder = "desc" } = query;

        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = {};

        if (search?.trim()) {
            filter.name = { $regex: search.trim(), $options: "i" }
        }

        if (typeof isActive === "boolean") {
            filter.isActive = isActive;
        }

        if (billingCycle) {
            filter.billingCycle = billingCycle;
        }

        const sort: Record<string, 1 | -1> = {
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        };

        const [docs, total] = await Promise.all([
            this._model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            this._model.countDocuments(filter)
        ]);

        return {
            items: docs.map((doc) => this._toDomain(doc)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
}