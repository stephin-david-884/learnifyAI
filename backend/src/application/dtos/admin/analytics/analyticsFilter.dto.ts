export interface AnalyticsFilterDTO {

    
    period:
        | "LAST_7_DAYS"
        | "LAST_30_DAYS"
        | "LAST_90_DAYS"
        | "THIS_MONTH"
        | "CUSTOM";

    startDate?: Date;

    endDate?: Date;
}