import mongoose, { Document, HydratedDocument, Model, Schema, Types } from "mongoose";

export interface IChatMessage {
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: Date;
}

export interface IChat extends Document {
    userId: Types.ObjectId;
    documentId: Types.ObjectId;
    title: string;
    messages: IChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IChatMessage>(
    {
        role: {
            type: String,
            enum: ["USER", "ASSISTANT"],
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
);

const chatSchema = new Schema<IChat>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        documentId: {
            type: Schema.Types.ObjectId,
            ref: "Document",
            required: true,
        },

        title: {
            type: String,
            default: "New Chat",
        },

        messages: {
            type: [messageSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const ChatModel: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export type ChatDocument = HydratedDocument<IChat>;

export type ChatLean = IChat & {
    _id: Types.ObjectId;
};