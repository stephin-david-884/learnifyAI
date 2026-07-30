import { AnalyticsFilterDTO } from "../../application/dtos/admin/analytics/analyticsFilter.dto";

export interface UserOverview {

    totalUsers: number;

    freeUsers: number;

    proUsers: number;

    blockedUsers: number;

    googleUsers: number;

    emailUsers: number;

    newUsers: number;

}

export interface UserRegistrationTrend {

    date: string;

    registrations: number;

}

export interface IUserAnalyticsRepository {

    getOverview(
        filter: AnalyticsFilterDTO
    ): Promise<UserOverview>;

    getRegistrationTrend(
        filter: AnalyticsFilterDTO
    ): Promise<UserRegistrationTrend[]>;

}