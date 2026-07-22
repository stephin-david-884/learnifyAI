export interface GetUserFlashcardSetsDTO {
    page?: number;
    limit?: number;
    search?: string;
    userId: string;
}