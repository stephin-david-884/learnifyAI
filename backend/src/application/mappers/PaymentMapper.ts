import { Types } from "mongoose";
import { Payment } from "../../domain/entities/Payment.entity";
import { PaymentLean } from "../../infrastructure/database/models/Payment";

export const toDomainPayment = (db: PaymentLean): Payment => {
  return new Payment({
    id: db._id.toString(),
    userId: db.userId.toString(),
    planId: db.planId.toString(),

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

    razorpayOrderId: entity.razorpayOrderId,
    razorpayPaymentId: entity.razorpayPaymentId,
    razorpaySignature: entity.razorpaySignature,

    amount: entity.amount,
    status: entity.status,
  };
};