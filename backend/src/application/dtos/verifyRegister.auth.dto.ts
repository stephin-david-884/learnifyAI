export interface VerifyRegisterInputDTO {
    email : string;
    otp: string;
}

export interface VerifyRegisterOutputDTO {
    success: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        subscriptionPlan: "FREE" | "PRO";
        credits: number;
    };
    accessToken: string;
    refreshToken: string;
    csrfToken: string;
}