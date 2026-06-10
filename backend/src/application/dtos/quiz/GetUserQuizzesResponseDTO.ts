import { QuizStatus } from "../../../domain/entities/Quiz.entity";
import { PaginatedResponseDTO } from "../common/paginated-response.dto";


export interface QuizListItemDTO {
    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    score: number;

    status: QuizStatus;

    createdAt?: Date;
}

export type GetUserQuizzesResponseDTO =
    PaginatedResponseDTO<QuizListItemDTO>;