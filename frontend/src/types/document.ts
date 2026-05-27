export type DocumentStatus = | "UPLOADING" | "PROCESSING" | "READY" | "FAILED";

export interface DocumentItem {
    id: string;

    userId: string;

    title: string;

    originalFileName: string;

    mimeType: string;

    fileSize: number;

    s3Key: string;

    fileUrl: string;

    totalPages?: number;

    status: DocumentStatus;

    processingError?: string;

    createdAt: string;

    updatedAt: string;
}

export interface GetUserDocumentsQuery {
    page?: number;

    limit?: number;

    search?: string;

    status?: DocumentStatus;

    sortBy?: "createdAt" | "title";

    sortOrder?: "asc" | "desc";
}

export interface PaginatedDocumentsResponse {
    items: DocumentItem[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;
}

export interface UploadDocumentPayload {
    title: string;

    file: File;
}

export interface DocumentState {
    documents: DocumentItem[];

    selectedDocument: DocumentItem | null;

    total: number;

    page: number;

    limit: number;

    totalPages: number;

    loading: boolean;

    uploadLoading: boolean;

    deleting: boolean;

    error: string | null;
}