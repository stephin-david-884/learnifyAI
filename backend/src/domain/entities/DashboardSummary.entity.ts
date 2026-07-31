import type { DocumentStatus } from "./Document.entity";

export type ActivityType =
    | "DOCUMENT"
    | "QUIZ"
    | "FLASHCARD"
    | "INTERVIEW";

export interface ContinueLearning {

    documentId: string;

    title: string;

    status: DocumentStatus;
}

export interface RecentActivity {

    type: ActivityType;

    title: string;

    description: string;

    createdAt: Date;
}

type DashboardSummaryProps = {

    totalDocuments: number;

    readyDocuments: number;

    totalQuizzes: number;

    completedQuizzes: number;

    averageQuizScore: number;

    totalFlashcardSets: number;

    totalFlashcards: number;

    totalInterviews?: number;

    completedInterviews?: number;

    averageInterviewScore?: number;

    continueLearning?: ContinueLearning;

    recentActivities: RecentActivity[];
};

export class DashboardSummary {

    public totalDocuments: number;

    public readyDocuments: number;

    public totalQuizzes: number;

    public completedQuizzes: number;

    public averageQuizScore: number;

    public totalFlashcardSets: number;

    public totalFlashcards: number;

    public totalInterviews?: number;

    public completedInterviews?: number;

    public averageInterviewScore?: number;

    public continueLearning?: ContinueLearning;

    public recentActivities: RecentActivity[];

    constructor(props: DashboardSummaryProps) {

        this.totalDocuments = props.totalDocuments;

        this.readyDocuments = props.readyDocuments;

        this.totalQuizzes = props.totalQuizzes;

        this.completedQuizzes = props.completedQuizzes;

        this.averageQuizScore = props.averageQuizScore;

        this.totalFlashcardSets = props.totalFlashcardSets;

        this.totalFlashcards = props.totalFlashcards;

        this.totalInterviews = props.totalInterviews;

        this.completedInterviews = props.completedInterviews;

        this.averageInterviewScore = props.averageInterviewScore;

        this.continueLearning = props.continueLearning;

        this.recentActivities = props.recentActivities;
    }
}