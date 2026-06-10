import { QuizDifficulty, QuizStatus } from "../../../domain/entities/Quiz.entity";

export interface QuizQuestionDTO {
    question: string;

    options: string[];

    difficulty: QuizDifficulty
}
export interface GetQuizResponseDTO {
    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    questions: QuizQuestionDTO[];

    status: QuizStatus;

    score: number;

    completedAt?: Date;

    createdAt?: Date;
}