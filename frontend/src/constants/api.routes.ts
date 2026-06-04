export const API_ROUTES = {
    AUTH: {
        REFRESH: "/user/auth/refresh",
        REGISTER: "/user/auth/register",
        VERIFY_OTP: "/user/auth/verify",
        RESEND_OTP: "/user/auth/resendotp",
        GET_ME: "/user/auth/me",
        LOGOUT: "/user/auth/logout",
        GOOGLE_LOGIN: "/user/auth/googleLogin",
        LOGIN: "/user/auth/login",
        FORGOT_PASSWORD: "/user/auth/forgotpassword",
        VERIFY_FORGOT_PASSWORD: "/user/auth/verify-otp-forgotpassword",
        RESET_PASSWORD: "/user/auth/resetpassword"
    },
    ADMIN: {
        LOGIN: "/admin/login",
        GET_ME: "/admin/me",
        LOG_OUT: "/admin/logout",
        GET_USERS: "/admin/users",
        BLOCK_USER: (userId: string) => `/admin/users/${userId}/block`
    },
    SUBSCRIPTION: {
        GET_AVAILABLE_PLANS: "/user/subscription/plans",
        CREATE_PAYMENT_ORDER: "/user/subscription/payment/order",
        VERIFY_PAYMENT: "/user/subscription/payment/verify",
        GET_ACTIVE_SUBSCRIPTION: "/user/subscription/active",
        GET_USER_PAYMENTS: "/user/subscription/payments",
        GET_CREDIT_STATUS: "/user/subscription/credits/status",
        MARK_PAYMENT_FAILED: "/user/subscription/payment/failure",
    },

    DOCUMENT: {
        UPLOAD_DOCUMENT: "/user/documents/upload",
        GET_USER_DOCUMENTS: "/user/documents",
        GET_DOCUMENT_BY_ID: (documentId: string) =>
            `/user/documents/${documentId}`,

        DELETE_DOCUMENT: (documentId: string) =>
            `/user/documents/${documentId}`,
        GET_DOCUMENT_VIEWER_URL: (documentId: string) =>
            `/user/documents/${documentId}/viewer-url`,
    },

    AI: {

        GET_CHAT_HISTORY: (documentId: string) =>
            `/user/ai/chat/${documentId}`,

        GENERATE_ANSWER:
            "/user/ai/chat/answer",
    },

    ADMIN_SUBSCRIPTION: {
        CREATE_PLAN: "/admin/subscription/plans",
        UPDATE_PLAN: "/admin/subscription/plans",
        DEACTIVATE_PLAN: (planId: string) =>
            `/admin/subscription/plans/${planId}/deactivate`,
        GET_ALL_PLANS: "/admin/subscription/plans",
        GET_PAYMENTS: "/admin/payments",
    }
}
