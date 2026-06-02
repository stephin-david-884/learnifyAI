export interface GetChatHistoryDTO {
    userId: string;
    documentId: string;
    page: number;
    limit: number;
}