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

        GET_USER_QUIZZES:
            "/user/ai/quizzes",

        GET_QUIZ: (quizId: string) =>
            `/user/ai/quiz/${quizId}`,

        GENERATE_QUIZ:
            "/user/ai/quiz",

        SUBMIT_QUIZ: (quizId: string) =>
            `/user/ai/quiz/${quizId}/submit`,

        GET_QUIZ_RESULT: (quizId: string) =>
            `/user/ai/quiz/${quizId}/result`,

        GET_USER_INTERVIEWS:
            "/user/ai/interviews",

        GET_INTERVIEW: (interviewId: string) =>
            `/user/ai/interview/${interviewId}`,

        GENERATE_INTERVIEW:
            "/user/ai/interview",

        SUBMIT_INTERVIEW: (interviewId: string) =>
            `/user/ai/interview/${interviewId}/submit`,

        COMPLETE_INTERVIEW: (interviewId: string) =>
            `/user/ai/interview/${interviewId}/complete`,

        GET_INTERVIEW_RESULT: (interviewId: string) =>
            `/user/ai/interview/${interviewId}/result`,

        START_INTERVIEW: (interviewId: string) =>
            `/user/ai/interview/${interviewId}/start`,

        GENERATE_FLASHCARDS : "/user/ai/flashcards",

        GET_USER_FLASHCARDS : "/user/ai/flashcards",

        GET_FLASHCARD_SET: (flashcardSetId: string) => 
             `/user/ai/flashcards/${flashcardSetId}`,

        DELETE_FLASHCARD_SET: (flashcardSetId: string) =>
            `/user/ai/flashcards/${flashcardSetId}`
    },

    PROFILE: {
        GET_PROFILE: "/user/profile",
        UPDATE_PROFILE: "/user/profile",
        CHANGE_PASSWORD: "/user/profile/password",
        CANCEL_SUBSCRIPTION: "/user/profile/subscription/cancel",
    },

    DASHBOARD: {
        GET_DASHBOARD: "/user/dashboard",
    },

    ADMIN_SUBSCRIPTION: {
        CREATE_PLAN: "/admin/subscription/plans",
        UPDATE_PLAN: "/admin/subscription/plans",
        DEACTIVATE_PLAN: (planId: string) =>
            `/admin/subscription/plans/${planId}/deactivate`,
        GET_ALL_PLANS: "/admin/subscription/plans",
        GET_PAYMENTS: "/admin/payments",
    },

    ADMIN_ANALYTICS: {
        GET_DASHBOARD_SUMMARY: "/admin/analytics/dashboard",
        GET_AI_ANALYTICS: "/admin/analytics/ai",
        GET_USER_ANALYTICS: "/admin/analytics/users",
        GET_DOCUMENT_ANALYTICS: "/admin/analytics/documents",
        GET_REVENUE_ANALYTICS: "/admin/analytics/revenue",
    }
}
