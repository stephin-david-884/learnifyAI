import { Types } from "mongoose";
import { Payment } from "../../domain/entities/Payment.entity";
import { PaymentLean } from "../../infrastructure/database/models/Payment";

export const toDomainPayment = (db: PaymentLean): Payment => {

  const populatedUser =
  typeof db.userId === "object" &&
  db.userId !== null &&
  "name" in db.userId &&
  "email" in db.userId
    ? db.userId as {
        _id: Types.ObjectId;
        name: string;
        email: string;
      }
    : null;

  return new Payment({
    id: db._id.toString(),
    userId: populatedUser
  ? populatedUser._id.toString()
  : db.userId.toString(),

user: populatedUser
  ? {
      id: populatedUser._id.toString(),
      name: populatedUser.name,
      email: populatedUser.email,
    }
  : undefined,
    planId: db.planId.toString(),
    planSnapshot: db.planSnapshot,

    razorpayOrderId: db.razorpayOrderId,
    razorpayPaymentId: db.razorpayPaymentId,
    razorpaySignature: db.razorpaySignature,

    amount: db.amount,
    status: db.status,

    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
  });
};

export const toPersistencePayment = (entity: Payment) => {
  return {
    userId: new Types.ObjectId(entity.userId),
    planId: new Types.ObjectId(entity.planId),
    planSnapshot: entity.planSnapshot,

    razorpayOrderId: entity.razorpayOrderId,
    razorpayPaymentId: entity.razorpayPaymentId,
    razorpaySignature: entity.razorpaySignature,

    amount: entity.amount,
    status: entity.status,
  };
};