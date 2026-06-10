import mongoose, {
    Document,
    HydratedDocument,
    Model,
    Schema,
    Types,
} from "mongoose";

export interface IQuizQuestion {
    question: string;

    options: string[];

    correctAnswer: string;

    explanation: string;

    difficulty:
        | "EASY"
        | "MEDIUM"
        | "HARD";
}

export interface IQuizAnswer {
    questionIndex: number;

    selectedAnswer: string;

    isCorrect: boolean;
}

export interface IQuiz extends Document {
    userId: Types.ObjectId;

    documentId: Types.ObjectId;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    questions: IQuizQuestion[];

    answers: IQuizAnswer[];

    score: number;

    status:
        | "GENERATING"
        | "READY"
        | "COMPLETED";

    completedAt?: Date;

    createdAt: Date;

    updatedAt: Date;
}

const quizQuestionSchema =
    new Schema<IQuizQuestion>(
        {
            question: {
                type: String,
                required: true,
            },

            options: {
                type: [String],
                required: true,
            },

            correctAnswer: {
                type: String,
                required: true,
            },

            explanation: {
                type: String,
                required: true,
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

const quizAnswerSchema =
    new Schema<IQuizAnswer>(
        {
            questionIndex: {
                type: Number,
                required: true,
            },

            selectedAnswer: {
                type: String,
                required: true,
            },

            isCorrect: {
                type: Boolean,
                required: true,
            },
        },
        {
            _id: false,
        }
    );

const quizSchema =
    new Schema<IQuiz>(
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
                type: [quizQuestionSchema],
                required: true,
            },

            answers: {
                type: [quizAnswerSchema],
                default: [],
            },

            score: {
                type: Number,
                default: 0,
            },

            status: {
                type: String,
                enum: [
                    "GENERATING",
                    "READY",
                    "COMPLETED",
                ],
                default: "READY",
            },

            completedAt: {
                type: Date,
            },
        },
        {
            timestamps: true,
        }
    );

quizSchema.index({
    userId: 1,
    documentId: 1,
    createdAt: -1,
});

export const QuizModel: Model<IQuiz> =
    mongoose.model<IQuiz>(
        "Quiz",
        quizSchema
    );

export type QuizDocument =
    HydratedDocument<IQuiz>;

export type QuizLean =
    IQuiz & {
        _id: Types.ObjectId;
    };