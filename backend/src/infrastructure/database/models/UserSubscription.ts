import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUserSubscription extends Document {
  userId: Types.ObjectId;
  planId: Types.ObjectId;
  planVersion: number;
  planSnapshot: {
    name: string;
    price: number;
    creditsPerMonth: number;
    features: {
      maxDocuments: number;
      interviewAccess: boolean
    };
  };

  startDate: Date;
  endDate: Date;

  status: "ACTIVE" | "EXPIRED" | "CANCELLED";

  creditsRemaining: number;
  creditsTotal: number;

  lastCreditReset: Date;

  paymentId?: string;

  createdAt: Date;
  updatedAt: Date;
}

const userSubscriptionSchema = new Schema<IUserSubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    planId: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan" },

    planVersion: { type: Number, required: true },
    planSnapshot: {
      name:{ type: String, required: true },
      price: { type: Number, required: true },
      creditsPerMonth: { type: Number, required: true },
      features: {
        maxDocuments: { type: Number, required: true },
        interviewAccess: { type: Boolean, required: true },
      },
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "CANCELLED"],
      default: "ACTIVE",
      index: true,
    },

    creditsRemaining: { type: Number, required: true },
    creditsTotal: { type: Number, required: true },

    lastCreditReset: { type: Date, required: true },

    paymentId: { type: String },
  },
  { timestamps: true }
);

// userSubscriptionSchema.index({ userId: 1, status: 1 });
userSubscriptionSchema.index(
  { userId: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "ACTIVE" },
  }
);
userSubscriptionSchema.index({ endDate: 1 });

export const UserSubscriptionModel: Model<IUserSubscription> =
  mongoose.model<IUserSubscription>(
    "UserSubscription",
    userSubscriptionSchema
  );

export type UserSubscriptionLean = IUserSubscription & {
  _id: Types.ObjectId;
}  