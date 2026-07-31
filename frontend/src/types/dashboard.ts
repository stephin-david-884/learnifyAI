export type DocumentStatus =
    | "UPLOADING"
    | "PROCESSING"
    | "READY"
    | "FAILED";

export interface ContinueLearning {
    documentId: string;

    title: string;

    status: DocumentStatus;
}

export interface DashboardSummary {
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
}

export interface DashboardState {
    summary: DashboardSummary | null;

    loading: boolean;

    error: string | null;
}