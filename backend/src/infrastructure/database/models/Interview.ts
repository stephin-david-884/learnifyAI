import mongoose, { Document, HydratedDocument, Model, Schema, Types } from "mongoose";

export interface IInterviewQuestion {
    question: string;
    expectedConcepts: string[];
    difficulty:
    | "EASY"
    | "MEDIUM"
    | "HARD";
}

export interface IInterviewAnswer {
    questionIndex: number;
    transcript: string;
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
    durationSeconds: number;
}

export interface IInterview extends Document {
    userId: Types.ObjectId;
    documentId: Types.ObjectId;
    title: string;
    generatedFromTopics: string[];
    totalQuestions: number;
    questions: IInterviewQuestion[];
    answers: IInterviewAnswer[];
    overallScore: number;
    status:
    | "GENERATING"
    | "READY"
    | "IN_PROGRESS"
    | "COMPLETED";
    startedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const interviewQuestionSchema =
    new Schema<IInterviewQuestion>(
        {
            question: {
                type: String,
                required: true,
            },

            expectedConcepts: {
                type: [String],
                default: [],
            },

            difficulty: {
                type: String,
                enum: [
                    "EASY",
                    "MEDIUM",
                    "HARD",
                ],
                required: true,
            },
        },
        {
            _id: false,
        }
    );

const interviewAnswerSchema =
    new Schema<IInterviewAnswer>(
        {

            questionIndex: {
                type: Number,
                required: true,
            },

            transcript: {
                type: String,
                required: true,
            },

            score: {
                type: Number,
                required: true,
            },

            feedback: {
                type: String,
                required: true,
            },

            strengths: {
                type: [String],
                default: [],
            },

            improvements: {
                type: [String],
                default: [],
            },

            durationSeconds: {
                type: Number,
                required: true,
            },
        },
        {
            _id: false,
        }
    );   
    
const interviewSchema = 
    new Schema<IInterview>(
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

            title: {
                type: String,
                required: true,
            },

            generatedFromTopics: {
                type: [String],
                default: [],
            },

            totalQuestions: {
                type: Number,
                required: true,
            },

            questions: {
                type: [interviewQuestionSchema],
                required: true,
            },

            answers: {
                type: [interviewAnswerSchema],
                default: [],
            },

            overallScore: {
                type: Number,
                default: 0,
            },

            status: {
                type: String,
                enum: [
                    "GENERATING",
                    "READY",
                    "IN_PROGRESS",
                    "COMPLETED",
                ],
                default: "GENERATING",
                index: true,
            },

            startedAt: {
                type: Date,
            },

            completedAt: {
                type: Date,
            },
        },
        {
            timestamps: true,
        }
    );
    
interviewSchema.index({
    userId: 1,
    documentId: 1,
    createdAt: -1,
});

export const InterviewModel: Model<IInterview> = 
    mongoose.model<IInterview>(
        "Interview",
        interviewSchema
    );

export type InterviewDocument = 
    HydratedDocument<IInterview>;
    
export type InterviewLean = 
    IInterview & {
        _id: Types.ObjectId;
}    