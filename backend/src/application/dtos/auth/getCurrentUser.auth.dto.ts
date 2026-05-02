export interface GetCurrentUserOutputDTO {
  id: string;
  name: string;
  email: string;
  subscriptionPlan: string;
  credits: number;
  isBlocked: boolean;
}