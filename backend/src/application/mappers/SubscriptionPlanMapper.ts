import { SubscriptionPlan } from "../../domain/entities/SubscriptionPlan.entity";
import { SubscriptionPlanlean } from "../../infrastructure/database/models/SubscriptionPlan";

export const toDomainSubscriptionPlan = (
    db: SubscriptionPlanlean
): SubscriptionPlan => {
    return new SubscriptionPlan({
        id: db._id.toString(),
        name: db.name,
        price: db.price,
        creditsPerMonth: db.creditsPerMonth,
        discount: db.discount,
        features: db.features,
        version: db.version,
        isActive: db.isActive,
        createdAt: db.createdAt,
        updatedAt: db.updatedAt
    });
};

export const toPersistenceSubscriptionPlan = (
    entity: SubscriptionPlan
) => {
    return {
        name: entity.name,
        price: entity.price,
        creditsPerMonth: entity.creditsPerMonth,
        discount: entity.discount,
        features: entity.features,
        version: entity.version,
        isActive: entity.isActive
    };
};