import { toDomainUserSubscription, toPersistenceUserSubscription } from "../../application/mappers/UserSubscriptionMapper";
import { UserSubscription } from "../../domain/entities/UserSubscription.entity";
import { IUserSubscriptionRepository } from "../../domain/repositories/IUserSubscriptionRepository";
import { UserSubscriptionLean, UserSubscriptionModel } from "../database/models/UserSubscription";
import { BaseRepository } from "./BaseRepository";

export class UserSubscriptionRepository
    extends BaseRepository<UserSubscription, UserSubscriptionLean>
    implements IUserSubscriptionRepository {
    constructor() {
        super(
            UserSubscriptionModel,
            toDomainUserSubscription,
            toPersistenceUserSubscription
        )
    }

    async findActiveByUserId(userId: string): Promise<UserSubscription | null> {
        const doc = await this._model
            .findOne({
                userId,
                status: "ACTIVE",
            })
            .lean();

        return doc ? this._toDomain(doc) : null;
    }

    async findByUserId(userId: string): Promise<UserSubscription[]> {
        const docs = await this._model
            .find({ userId })
            .lean();

        return docs.map(doc => this._toDomain(doc));
    }

    async findExpiringSubscriptions(date: Date): Promise<UserSubscription[]> {
        const docs = await this._model
            .find({
                endDate: { $lte: date },
                status: "ACTIVE",
            })
            .lean();

        return docs.map(doc => this._toDomain(doc));
    }

    async findActiveSubscriptions(): Promise<UserSubscription[]> {

        const docs = await this._model
            .find({ status: "ACTIVE" })
            .lean();

        return docs.map(doc => this._toDomain(doc));
    }

    async existsByPlan(planId: string, version: number): Promise<boolean> {
        
        const exists = await this._model.exists({
            planId,
            planVersion: version,
            status: "ACTIVE",
        });

        return exists ? true : false;
    }

    async cancelActiveSubscription(userId: string): Promise<void> {
        await this._model.updateMany(
            {
                userId,
                status: "ACTIVE"
            },
            {
                $set: {
                    status: "CANCELLED"
                }
            }
        );
    }

    // async findSubscriptionsNeedingCreditReset(): Promise<UserSubscription[]> {
    //     const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    //     const cutoff = new Date(Date.now() - THIRTY_DAYS);

    //     const docs = await this._model
    //         .find({
    //             lastCreditReset: { $lte: cutoff},
    //             status: "ACTIVE"
    //         })
    //         .lean();

    //     return docs.map(doc => this._toDomain(doc));
    // }
}