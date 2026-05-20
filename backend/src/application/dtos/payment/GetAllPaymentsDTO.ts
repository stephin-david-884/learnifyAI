export interface GetAllPaymentsDTO {
    page:number;
    limit: number;
    search?: string;
    status?: "CREATED" | "SUCCESS" | "FAILED";
    sortBy?: "createdAt" | "amount";
    sortOrder?: "asc" | "desc";
}