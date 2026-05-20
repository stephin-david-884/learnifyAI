import { GetAllPaymentsDTO } from "../../dtos/payment/GetAllPaymentsDTO";

export const mapToGetAllPaymentsDTO = (
    query: Record<string, unknown>
): GetAllPaymentsDTO => {

    return {
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 10,
        search: query.search as string,
        status: query.status as | "CREATED" | "SUCCESS" | "FAILED" | undefined,

        sortBy: query.sortBy as | "createdAt" | "amount"| undefined,

        sortOrder: query.sortOrder as | "asc" | "desc" | undefined,
    };

}