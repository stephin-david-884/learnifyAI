export type QuizDifficulty =
    | "EASY"
    | "MEDIUM"
    | "HARD";

export type QuizStatus =
    | "GENERATING"
    | "READY"
    | "COMPLETED";

export interface QuizQuestion {
    question: string;

    options: string[];

    correctAnswer: string;

    explanation: string;

    difficulty: QuizDifficulty;
}

export interface QuizAnswer {
    questionIndex: number;

    selectedAnswer: string;

    isCorrect: boolean;
}

type QuizProps = {
    id?: string;

    userId: string;

    documentId: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    questions: QuizQuestion[];

    answers?: QuizAnswer[];

    score?: number;

    status?: QuizStatus;

    completedAt?: Date;

    createdAt?: Date;

    updatedAt?: Date;
};

export class Quiz {
    public readonly id?: string;

    public readonly userId: string;

    public readonly documentId: string;

    public title: string;

    public generatedFromTopics: string[];

    public totalQuestions: number;

    public questions: QuizQuestion[];

    public answers: QuizAnswer[];

    public score: number;

    public status: QuizStatus;

    public completedAt?: Date;

    public readonly createdAt?: Date;

    public readonly updatedAt?: Date;

    constructor(props: QuizProps) {
        this.id = props.id;

        this.userId = props.userId;

        this.documentId = props.documentId;

        this.title = props.title;

        this.generatedFromTopics =
            props.generatedFromTopics;

        this.totalQuestions =
            props.totalQuestions;

        this.questions =
            props.questions;

        this.answers =
            props.answers ?? [];

        this.score =
            props.score ?? 0;

        this.status =
            props.status ?? "GENERATING";

        this.completedAt =
            props.completedAt;

        this.createdAt =
            props.createdAt;

        this.updatedAt =
            props.updatedAt;
    }

    completeQuiz(
        answers: QuizAnswer[],
        score: number
    ) {
        this.answers = answers;

        this.score = score;

        this.status = "COMPLETED";

        this.completedAt = new Date();
    }

    getId(): string {
        if (!this.id) {
            throw new Error(
                "Quiz ID is not set"
            );
        }

        return this.id;
    }
}