export interface GetAllUsersInputDTO {
    page: number;
    limit: number;
    search?: string;
}

export interface UserListItemDTO {
    id: string;
    name: string;
    email: string;
    subscriptionPlan: string;
    credits: number;
    isBlocked: boolean;
    createdAt: Date;
}

export interface GetAllUsersOutputDTO {
    users: UserListItemDTO[];
    total: number;
    page: number;
    limit: number;
}