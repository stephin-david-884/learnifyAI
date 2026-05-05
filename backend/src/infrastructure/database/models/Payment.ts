import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPayment extends Document {
  userId: Types.ObjectId;
  planId: Types.ObjectId;

  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  amount: number;

  status: "CREATED" | "SUCCESS" | "FAILED";

  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    planId: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan" },

    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED"],
      default: "CREATED",
      index: true,
    },
  },
  { timestamps: true }
);

export const PaymentModel: Model<IPayment> =
  mongoose.model<IPayment>("Payment", paymentSchema);
 
export type PaymentLean = IPayment & {
  _id: Types.ObjectId;
};