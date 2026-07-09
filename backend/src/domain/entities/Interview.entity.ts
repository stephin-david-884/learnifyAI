export type InterviewDifficulty = 
    | "EASY"
    | "MEDIUM"
    | "HARD";

export type InterviewStatus = 
     "GENERATING"
    | "READY"
    | "IN_PROGRESS"
    | "COMPLETED";
    
export interface InterviewQuestion {
    question: string;
    expectedConcepts: string[];
    difficulty: InterviewDifficulty;
}

export interface InterviewAnswer {
    questionIndex: number;
    transcript: string;
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
    durationSeconds: number;
}

type InterviewProps = {
    id?: string;
    userId: string;
    documentId: string;
    title: string;
    generatedFromTopics: string[];
    totalQuestions: number;
    questions: InterviewQuestion[];
    answers?: InterviewAnswer[];
    overallScore?: number;
    status?: InterviewStatus;
    startedAt?: Date;
    completedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Interview {
    public readonly id?: string;
    public readonly userId: string;
    public readonly documentId: string;
    public title: string;
    public generatedFromTopics: string[];
    public totalQuestions: number;
    public questions: InterviewQuestion[];
    public answers: InterviewAnswer[];
    public overallScore: number;
    public status: InterviewStatus;
    public startedAt?: Date;
    public completedAt?: Date;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    constructor(props: InterviewProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.documentId = props.documentId;
        this.title = props.title;
        this.generatedFromTopics = props.generatedFromTopics;
        this.totalQuestions = props.totalQuestions;
        this.questions = props.questions;
        this.answers = props.answers ?? [];
        this.overallScore = props.overallScore ?? 0;
        this.status = props.status ?? "GENERATING";
        this.startedAt = props.startedAt;
        this.completedAt = props.completedAt;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    startInterview() {
        this.status = "IN_PROGRESS";
        this.startedAt = new Date();
    }
    submitAnswer( answer: InterviewAnswer) {

        this.answers.push(answer);
    }
    completeInterview( overallScore: number) {

        this.overallScore =
            overallScore;

        this.status = "COMPLETED";
        this.completedAt = new Date();
    }
    getId(): string {

        if (!this.id) {
            throw new Error( "Interview ID is not set");
        }

        return this.id;
    }
}