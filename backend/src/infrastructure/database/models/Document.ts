import mongoose, { Document as MongooseDocument, Model, Schema, Types } from "mongoose";

export interface IDocument extends MongooseDocument {
    userId: Types.ObjectId;
    title: string;
    originalFileName: string;
    mimeType: string;
    fileSize: number;
    s3Key: string;
    fileUrl: string;
    totalPages?: number | null;
    status: | "UPLOADING" | "PROCESSING" | "READY" | "FAILED";
    processingProgress: number;
    processingStage?: string | null;
    topics: string[];
    processingError?: string | null;

    createdAt: Date;
    updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        originalFileName: {
            type: String,
            required: true,
        },

        mimeType: {
            type: String,
            required: true,
        },

        fileSize: {
            type: Number,
            required: true,
        },

        s3Key: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        totalPages: {
            type: Number,
            default: null,
        },

        status: {
            type: String,
            enum: [
                "UPLOADING",
                "PROCESSING",
                "READY",
                "FAILED",
            ],
            default: "UPLOADING",
            index: true,
        },

        processingProgress: {
            type: Number,
            default: 0,
        },

        processingStage: {
            type: String,
            default: null,
        },

        topics: {
            type: [String],
            default: [],
        },

        processingError: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const DocumentModel: Model<IDocument> = mongoose.model<IDocument>("Document", documentSchema);

export type DocumentLean = IDocument & {
    _id: Types.ObjectId;
}