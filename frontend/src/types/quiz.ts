export type QuizDifficulty =
    | "EASY"
    | "MEDIUM"
    | "HARD";

export type QuizStatus =
    | "GENERATING"
    | "READY"
    | "COMPLETED";

export interface GenerateQuizPayload {
    documentId: string;

    title?: string;

    topics: string[];

    questionCount: number;
}

export interface GenerateQuizResponse {
    quizId: string;
}

export interface QuizQuestion {
    question: string;

    options: string[];

    difficulty: QuizDifficulty;
}

export interface Quiz {
    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    questions: QuizQuestion[];

    status: QuizStatus;

    score: number;

    completedAt?: string;

    createdAt?: string;
}

export interface QuizListItem {
    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    score: number;

    status: QuizStatus;

    createdAt?: string;
}

export interface GetUserQuizzesResponse {
    items: QuizListItem[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;
}

export interface SubmitQuizAnswer {
    questionIndex: number;

    selectedAnswer: string;
}

export interface SubmitQuizPayload {
    quizId: string;

    answers: SubmitQuizAnswer[];
}

export interface QuizReviewItem {
    question: string;

    options: string[];

    selectedAnswer: string;

    correctAnswer: string;

    explanation: string;

    isCorrect: boolean;

    difficulty: QuizDifficulty;
}

export interface SubmitQuizResponse {
    quizId: string;

    score: number;

    totalQuestions: number;

    correctAnswers: number;

    percentage: number;

    review: QuizReviewItem[];
}

export interface QuizState {
    quizzes: QuizListItem[];

    currentQuiz: Quiz | null;

    quizResult: SubmitQuizResponse | null;

    loading: boolean;

    generating: boolean;

    submitting: boolean;

    error: string | null;

    page: number;

    limit: number;

    totalPages: number;

    total: number;
}