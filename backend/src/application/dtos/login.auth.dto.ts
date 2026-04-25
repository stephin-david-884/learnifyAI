export interface LoginOutputDTO {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    subscriptionPlan: string;
    credits: number;
  };
}