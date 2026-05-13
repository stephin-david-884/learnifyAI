export const API_ROUTES = {
    AUTH: {
        REFRESH: "/auth/refresh",
        REGISTER: "/auth/register",
        VERIFY_OTP: "/auth/verify",
        RESEND_OTP: "/auth/resendotp",
        GET_ME: "/auth/me",
        LOGOUT: "/auth/logout",
        GOOGLE_LOGIN: "/auth/googleLogin",
        LOGIN: "/auth/login",
        FORGOT_PASSWORD: "/auth/forgotpassword",
        VERIFY_FORGOT_PASSWORD: "/auth/verify-otp-forgotpassword",
        RESET_PASSWORD: "/auth/resetpassword"
    },
    ADMIN: {
        LOGIN: "/admin/login",
        GET_ME: "/admin/me",
        LOG_OUT: "/admin/logout",
        GET_USERS: "/admin/users",
        BLOCK_USER: (userId: string) => `/admin/users/${userId}/block`
    },
    SUBSCRIPTION: {
        GET_AVAILABLE_PLANS: "/subscription/plans",
        CREATE_PAYMENT_ORDER: "/subscription/payment/order",
        VERIFY_PAYMENT: "/subscription/payment/verify",
        GET_ACTIVE_SUBSCRIPTION: "/subscription/active",
        GET_USER_PAYMENTS: "/subscription/payments",
        GET_CREDIT_STATUS: "/subscription/credits/status",
    },
    ADMIN_SUBSCRIPTION: {
        CREATE_PLAN: "/admin/subscription/plans",
        UPDATE_PLAN: "/admin/subscription/plans",
        DEACTIVATE_PLAN: (planId: string) =>
            `/admin/subscription/plans/${planId}/deactivate`,
        GET_ALL_PLANS: "/admin/subscription/plans",
    }
}