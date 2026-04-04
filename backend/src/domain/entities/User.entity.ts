export type SubscriptionPlan = "FREE" | "PRO";

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;

  googleId?: string;

  profileImage?: string;

  subscriptionPlan: SubscriptionPlan;
  credits: number;
  subscriptionExpiresAt?: Date;

  isBlocked: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}