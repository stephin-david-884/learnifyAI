import mongoose, { Document, Types } from "mongoose";

export interface AdminDocument extends Document {
    name: string;
    email: string;
    password: string;
    isSuperAdmin: boolean;
    isActive: boolean;
    refreshTokens: string[];
    createdAt: Date;
    updatedAt: Date;
}

const adminSchema = new mongoose.Schema<AdminDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false, // important
        },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        refreshTokens: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const AdminModel = mongoose.model<AdminDocument>("Admin", adminSchema)

export type AdminLean = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;

    isSuperAdmin?: boolean;
    isActive?: boolean;

    refreshTokens?: string[];

    createdAt?: Date;
    updatedAt?: Date;
};