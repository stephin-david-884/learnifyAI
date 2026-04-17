export interface User {
    id: string;
    name: string;
    email: string;
    subscriptionPlan: "FREE" | "PRO";
    credits: number;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    registerEmail: string | null;
    initialized: boolean;
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