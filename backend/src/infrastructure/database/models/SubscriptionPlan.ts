import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { BillingCycle } from "../../../domain/entities/SubscriptionPlan.entity";

export interface ISubscriptionPlan extends Document {
  name: string;
  price: number;
  creditsPerMonth: number;
  discount: number;
  features: {
    maxDocuments: number;
    interviewAccess: boolean;
  };
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  billingCycle: BillingCycle;
  durationInDays: number;
  creditResetIntervalInDays: number;
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    creditsPerMonth: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    features: {
      maxDocuments: { type: Number, required: true },
      interviewAccess: { type: Boolean, required: true },
    },
    version: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    billingCycle: { type: String, enum: ["MONTHLY", "YEARLY"], required: true },
    durationInDays: { type: Number, required: true },
    creditResetIntervalInDays: { type: Number, required: true,},
  },
  { timestamps: true }
);

subscriptionPlanSchema.index({ name: 1, billingCycle: 1, version: 1 }, { unique: true });

export const SubscriptionPlanModel: Model<ISubscriptionPlan> =
  mongoose.model<ISubscriptionPlan>("SubscriptionPlan", subscriptionPlanSchema);

export type SubscriptionPlanlean = ISubscriptionPlan & {
  _id: Types.ObjectId
};