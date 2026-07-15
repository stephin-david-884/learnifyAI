export type InterviewDifficulty = 
    | "EASY"
    | "MEDIUM"
    | "HARD";

export type InterviewStatus =
    | "GENERATING"
    | "READY"
    | "IN_PROGRESS"
    | "COMPLETED";

export interface InterviewQuestion {
    question: string;

    difficulty: InterviewDifficulty;
}    
    
export interface Interview {
    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    questions: InterviewQuestion[];

    status: InterviewStatus;

    overallScore: number;

    startedAt?: string;

    completedAt?: string;

    createdAt?: string;
} 

export interface InterviewListItem {
    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    overallScore: number;

    status: InterviewStatus;

    createdAt?: string;
}

export interface InterviewAnswerPayload {
    questionIndex: number;

    transcript: string;
}

export interface InterviewReviewItem {
    question: string;

    transcript: string;

    score: number;

    feedback: string;

    strengths: string[];

    improvements: string[];
}

export interface GenerateInterviewPayload {
    documentId: string;

    title?: string;

    topics: string[];

    questionCount: 5 | 10;
}

export interface GenerateInterviewResponse {
    interviewId: string;
}

export interface SubmitInterviewPayload {
    interviewId: string;

    answers: InterviewAnswerPayload[];
}

export interface SubmitInterviewResponse {
    interviewId: string;
}

export interface CompleteInterviewResponse {
    interviewId: string;
}

export interface GetInterviewResultResponse {
    interviewId: string;

    overallScore: number;

    totalQuestions: number;

    review: InterviewReviewItem[];
}

export interface GetUserInterviewsResponse {
    items: InterviewListItem[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;
}

export interface StartInterviewResponse {
    interviewId: string;
}

export interface InterviewState {
    interviews: InterviewListItem[];

    currentInterview: Interview | null;

    interviewResult: GetInterviewResultResponse | null;

    loading: boolean;

    generating: boolean;

    starting: boolean;

    submitting: boolean;

    completing: boolean;

    error: string | null;

    page: number;

    limit: number;

    totalPages: number;

    total: number;
}