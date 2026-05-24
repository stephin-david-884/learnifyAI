import { DocumentStatus } from "../../../domain/entities/Document.entity";

export interface GetUserDocumentsDTO {
    page: number;
    limit: number;

    search?: string;
    status?: DocumentStatus;

    sortBy?: "createdAt" | "title";
    sortOrder?: "asc" | "desc";
}