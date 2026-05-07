import { Types } from "mongoose";
import { UserSubscription } from "../../domain/entities/UserSubscription.entity";
import { UserSubscriptionLean } from "../../infrastructure/database/models/UserSubscription";

export const toDomainUserSubscription = (
  db: UserSubscriptionLean
): UserSubscription => {
  return new UserSubscription({
    id: db._id.toString(),
    userId: db.userId.toString(),
    planId: db.planId.toString(),
    planVersion: db.planVersion,
    planSnapshot: db.planSnapshot,

    startDate: db.startDate,
    endDate: db.endDate,

    status: db.status,

    creditsRemaining: db.creditsRemaining,
    creditsTotal: db.creditsTotal,

    lastCreditReset: db.lastCreditReset,

    paymentId: db.paymentId,

    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
  });
};

export const toPersistenceUserSubscription = (
  entity: UserSubscription
) => {
  return {
    userId: new Types.ObjectId(entity.userId),
    planId: new Types.ObjectId(entity.planId),
    planVersion: entity.planVersion,
    planSnapshot: entity.planSnapshot,

    startDate: entity.startDate,
    endDate: entity.endDate,

    status: entity.status,

    creditsRemaining: entity.creditsRemaining,
    creditsTotal: entity.creditsTotal,

    lastCreditReset: entity.lastCreditReset,

    paymentId: entity.paymentId,
  };
};