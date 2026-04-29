export interface AdminUser {
  id: string;
  name: string;
  email: string;
  subscriptionPlan: "FREE" | "PRO";
  credits: number;
  isBlocked: boolean;
  createdAt: string;
}

export interface GetUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
}

export type BlockAction = "BLOCK" | "UNBLOCK";

export interface BlockUserParams {
  userId: string;
  action: BlockAction;
}