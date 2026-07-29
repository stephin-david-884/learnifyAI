import mongoose, { Document, HydratedDocument, Model, Schema, Types } from "mongoose";
import { AIProvider, AIUsageFeature, AIUsageMetadata, AIUsageStatus } from "../../../domain/entities/AIUsageEvent.entity";

export interface IAIUsageEvent extends Document {

    provider: AIProvider;

    feature: AIUsageFeature;

    aiModel: string;

    userId?: Types.ObjectId | null;

    documentId?: Types.ObjectId | null;

    requestTokens?: number | null;

    responseTokens?: number | null;

    totalTokens?: number | null;

    estimatedCost: number;

    latencyMs: number;

    status: AIUsageStatus;

    error?: string | null;

    metadata: AIUsageMetadata;

    createdAt: Date;

    updatedAt: Date;
}

const aiUsageEventSchema =
    new Schema<IAIUsageEvent>(
        {
            provider: {
                type: String,
                required: true,
                enum: [
                    "GEMINI",
                    "GROQ",
                    "OPENAI",
                    "CLAUDE",
                    "AZURE_OPENAI",
                    "MISTRAL",
                ],
            },

            feature: {
                type: String,
                required: true,
                enum: [
                    "DOCUMENT_EMBEDDING",
                    "VISUAL_EMBEDDING",
                    "TOPIC_EXTRACTION",
                    "FLASHCARD_GENERATION",
                    "QUIZ_GENERATION",
                    "INTERVIEW_GENERATION",
                    "INTERVIEW_EVALUATION",
                    "CHAT",
                    "DOCUMENT_SEARCH",
                ],
            },

            aiModel: {
                type: String,
                required: true,
                trim: true,
            },

            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                default: null,
            },

            documentId: {
                type: Schema.Types.ObjectId,
                ref: "Document",
                default: null,
            },

            requestTokens: {
                type: Number,
                default: null,
                min: 0,
            },

            responseTokens: {
                type: Number,
                default: null,
                min: 0,
            },

            totalTokens: {
                type: Number,
                default: null,
                min: 0,
            },

            estimatedCost: {
                type: Number,
                default: 0,
                min: 0,
            },

            latencyMs: {
                type: Number,
                required: true,
                min: 0,
            },

            status: {
                type: String,
                required: true,
                enum: [
                    "SUCCESS",
                    "FAILED",
                ],
                default: "SUCCESS",
            },

            error: {
                type: String,
                default: null,
            },

            metadata: {
                type: Schema.Types.Mixed,
                default: {},
            },
        },
        {
            timestamps: true,
        }
    );

aiUsageEventSchema.index({
    createdAt: -1,
});

aiUsageEventSchema.index({
    provider: 1,
    createdAt: -1,
});

aiUsageEventSchema.index({
    feature: 1,
    createdAt: -1,
});

aiUsageEventSchema.index({
    status: 1,
    createdAt: -1,
});

aiUsageEventSchema.index({
    userId: 1,
    createdAt: -1,
});

aiUsageEventSchema.index({
    documentId: 1,
    createdAt: -1,
});

aiUsageEventSchema.index({
    provider: 1,
    feature: 1,
    createdAt: -1,
});

export const AIUsageEventModel: Model<IAIUsageEvent> =
    mongoose.model<IAIUsageEvent>(
        "AIUsageEvent",
        aiUsageEventSchema
    );

export type AIUsageEventDocument =
    HydratedDocument<IAIUsageEvent>;

export type AIUsageEventLean =
    IAIUsageEvent & {
        _id: Types.ObjectId;
    };