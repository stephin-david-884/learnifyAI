import mongoose, { Schema, Document, Model, Types } from "mongoose";

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
  },
  { timestamps: true }
);

subscriptionPlanSchema.index({ name: 1, version: 1 }, { unique: true });

export const SubscriptionPlanModel: Model<ISubscriptionPlan> =
  mongoose.model<ISubscriptionPlan>("SubscriptionPlan", subscriptionPlanSchema);

  export type SubscriptionPlanlean = ISubscriptionPlan & {
    _id: Types.ObjectId
  };