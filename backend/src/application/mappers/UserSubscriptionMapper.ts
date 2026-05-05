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
    userId: entity.userId,
    planId: entity.planId,
    planVersion: entity.planVersion,

    startDate: entity.startDate,
    endDate: entity.endDate,

    status: entity.status,

    creditsRemaining: entity.creditsRemaining,
    creditsTotal: entity.creditsTotal,

    lastCreditReset: entity.lastCreditReset,

    paymentId: entity.paymentId,
  };
};