import { Request } from "express";
import { AnalyticsFilterDTO } from "../../../dtos/admin/analytics/analyticsFilter.dto";

export const mapToAnalyticsFilterDTO = (
    req: Request
): AnalyticsFilterDTO => {

    return {

        period: req.query.period as AnalyticsFilterDTO["period"] ?? "LAST_7_DAYS",

        startDate: req.query.startDate
            ? new Date(req.query.startDate as string)
            : undefined,

        endDate: req.query.endDate
            ? new Date(req.query.endDate as string)
            : undefined,

    };

};