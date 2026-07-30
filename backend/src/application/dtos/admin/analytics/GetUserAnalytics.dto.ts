export interface UserOverview {

    totalUsers: number;

    freeUsers: number;

    proUsers: number;

    blockedUsers: number;

    newUsers: number;

}

export interface UserRegistrationTrend {

    date: string;

    registrations: number;

}

export interface GetUserAnalyticsResponseDTO {

    overview: UserOverview;

    registrations: UserRegistrationTrend[];

}