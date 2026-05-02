export interface User {
    id: string;
    name: string;
    email: string;
    subscriptionPlan: "FREE" | "PRO";
    credits: number;
    isBlocked: boolean;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    registerEmail: string | null;
    initialized: boolean;
    isBlocked: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  email: string;
  message: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  user: User;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyForgotPasswordPayload {
  email: string;
  otp: string;
}

export interface VerifyForgotPasswordResponse {
  email: string;
  resetToken: string;
  message: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
  resetToken: string;
}