import mongoose, { Document as MongooseDocument, Model, Schema, Types, HydratedDocument } from "mongoose";

export interface IFlashcard {

    question: string;

    answer: string;

    difficulty:
        | "EASY"
        | "MEDIUM"
        | "HARD";
}

export interface IFlashcardSet
    extends MongooseDocument {

    userId: Types.ObjectId;

    documentId: Types.ObjectId;

    topic: string;

    cardCount: number;

    creditsUsed: number;

    cards: IFlashcard[];

    createdAt: Date;

    updatedAt: Date;
}

const flashcardSchema =
    new Schema<IFlashcard>(
        {
            question: {
                type: String,
                required: true,
                trim: true,
            },

            answer: {
                type: String,
                required: true,
                trim: true,
            },

            difficulty: {
                type: String,
                enum: [
                    "EASY",
                    "MEDIUM",
                    "HARD",
                ],
                default: "MEDIUM",
            },
        },
        {
            _id: false,
        }
    );

const flashcardSetSchema =
    new Schema<IFlashcardSet>(
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                index: true,
            },

            documentId: {
                type: Schema.Types.ObjectId,
                ref: "Document",
                required: true,
                index: true,
            },

            topic: {
                type: String,
                required: true,
                trim: true,
            },

            cardCount: {
                type: Number,
                required: true,
            },

            creditsUsed: {
                type: Number,
                required: true,
            },

            cards: {
                type: [flashcardSchema],
                default: [],
            },
        },
        {
            timestamps: true,
        }
    );

flashcardSetSchema.index({
    userId: 1,
    documentId: 1,
});

export const FlashcardSetModel: Model<IFlashcardSet> =
    mongoose.model<IFlashcardSet>(
        "FlashcardSet",
        flashcardSetSchema
    );

export type FlashcardSetDocument = HydratedDocument<IFlashcardSet>;    

export type FlashcardSetLean =
    IFlashcardSet & {
        _id: Types.ObjectId;
    };