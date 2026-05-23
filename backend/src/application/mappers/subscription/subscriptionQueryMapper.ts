import { GetAvailablePlansDTO } from "../../dtos/subscription/get-available-plans.dto";

export const mapGetAvailablePlansQuery = (
    query: Record<string, unknown>
): GetAvailablePlansDTO => {

    return {
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 6,
    }

}