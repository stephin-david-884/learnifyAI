import { AnalyticsFilterDTO } from "../application/dtos/admin/analytics/analyticsFilter.dto";


export interface DateRange {

    startDate: Date;

    endDate: Date;
}

export function buildDateRange(
    filter: AnalyticsFilterDTO
): DateRange {

    const endDate = new Date();

    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date(endDate);

    switch (filter.period) {

        case "LAST_7_DAYS":

            startDate.setDate(startDate.getDate() - 6);
            break;

        case "LAST_30_DAYS":

            startDate.setDate(startDate.getDate() - 29);
            break;

        case "LAST_90_DAYS":

            startDate.setDate(startDate.getDate() - 89);
            break;

        case "THIS_MONTH":

            startDate.setDate(1);
            break;

        case "CUSTOM":

            if (!filter.startDate || !filter.endDate) {

                throw new Error(
                    "Custom period requires startDate and endDate."
                );

            }

            return {

                startDate: filter.startDate,

                endDate: filter.endDate,

            };

    }

    startDate.setHours(0, 0, 0, 0);

    return {

        startDate,

        endDate,

    };

}