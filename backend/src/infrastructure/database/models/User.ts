import mongoose, { Document, HydratedDocument, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  profileImage?: string | null;
  googleId?: string | null;
  refreshTokens: string[];
  subscriptionPlan: "FREE" | "PRO";
  credits: number;
  subscriptionExpiresAt?: Date | null;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String,
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true, 
        select: false },
    profileImage: { 
        type: String, 
        default: null },
    googleId: { 
        type: String, 
        default: null 
    },
    subscriptionPlan: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE",
    },
    credits: {
      type: Number,
      default: 20,
    },
    subscriptionExpiresAt: {
      type: Date,
      default: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshTokens: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);


export const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export type UserDocument = HydratedDocument<IUser>;

export type UserLean = IUser & {
  _id: Types.ObjectId;
}