import {
    QuizDifficulty,
} from "../../../domain/entities/Quiz.entity";

export interface QuizReviewItemDTO {
    question: string;

    options: string[];

    selectedAnswer: string;

    correctAnswer: string;

    explanation: string;

    isCorrect: boolean;

    difficulty: QuizDifficulty;
}

export interface SubmitQuizResponseDTO {
    quizId: string;

    score: number;

    totalQuestions: number;

    correctAnswers: number;

    percentage: number;

    review: QuizReviewItemDTO[];
}