export interface QuizReviewItemDTO {
    questionIndex: number;

    selectedAnswer: string;

    correctAnswer: string;

    isCorrect: boolean;

    explanation: string;
}

export interface SubmitQuizResponseDTO {
    score: number;

    totalQuestions: number;

    review: QuizReviewItemDTO[];
}