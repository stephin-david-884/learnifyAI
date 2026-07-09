import { InterviewDifficulty, InterviewStatus } from "../../../domain/entities/Interview.entity";

export interface InterviewQuestionDTO {
    question: string;

    difficulty: InterviewDifficulty;
}

export interface GetInterviewResponseDTO {

    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    questions: InterviewQuestionDTO[];

    status: InterviewStatus;

    createdAt?: Date;
}