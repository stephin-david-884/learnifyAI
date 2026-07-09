import { InterviewStatus } from "../../../domain/entities/Interview.entity";
import { PaginatedResponseDTO } from "../common/paginated-response.dto";

export interface InterviewListItemDTO {

    id: string;

    title: string;

    generatedFromTopics: string[];

    totalQuestions: number;

    overallScore: number;

    status: InterviewStatus;

    createdAt?: Date;
}

export type GetUserInterviewsResponseDTO =
    PaginatedResponseDTO<InterviewListItemDTO>;