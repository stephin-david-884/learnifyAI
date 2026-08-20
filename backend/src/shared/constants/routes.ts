export const ROUTES = {
  AUTH: {
    REGISTER: "/register",
    VERIFY_OTP: "/verify",
    RESEND_OTP: "/resendotp",
    REFRESH_TOKEN: "/refresh",
    GET_ME: "/me",
    LOG_OUT: "/logout",
    GOOGLE_LOGIN: "/googleLogin",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgotpassword",
    VERIFY_OTP_RESET: "/verify-otp-forgotpassword",
    RESET_PASSWORD: "/resetpassword",
    RESEND_FORGOT_PASSWORD_OTP:"/resend-forgot-password-otp",
  },

  ADMIN: {
    LOGIN: "/login",
    REFRESH_TOKEN: "/refresh",
    GET_ME: "/me",
    LOG_OUT: "/logout",
    GET_USERS: "/users",
    BLOCK_USER: "/users/:userId/block",
  },

  SUBSCRIPTION: {
    CREATE_PAYMENT_ORDER: "/payment/order",
    VERIFY_PAYMENT: "/payment/verify",
    GET_AVAILABLE_PLANS: "/plans",
    GET_ACTIVE_SUBSCRIPTION: "/active",
    GET_USER_PAYMENTS: "/payments",
    GET_CREDIT_STATUS: "/credits/status",
    MARK_PAYMENT_FAIL: "/payment/failure"
  },

  ADMIN_SUBSCRIPTION: {
    GET_ALL_PLANS: "/subscription/plans",

    CREATE_PLAN: "/subscription/plans",

    UPDATE_PLAN: "/subscription/plans",

    DEACTIVATE_PLAN:
      "/subscription/plans/:planId/deactivate",

    GET_PAYMENTS: "/payments",
  },

  DOCUMENT: {
    UPLOAD: "/upload",
    GET_USER_DOCUMENTS: "/",
    GET_DOCUMENT_BY_ID: "/:documentId",
    DELETE_DOCUMENT: "/:documentId",
    DOCUMENT_VIEWER: "/:documentId/viewer-url",
  },

  CHAT: {
    GET_CHAT: "/chat/:documentId",
    GENERATE_ANSWER: "/chat/answer",
  },

  QUIZ: {
    GENERATE_QUIZ: "/quiz",
    GET_ONE: "/quiz/:quizId",
    GET_ALL: "/quizzes",
    SUBMIT: "/quiz/:quizId/submit",
    GET_QUIZ_RESULT: "/quiz/:quizId/result",
  },

  PROFILE: {
    GET_PROFILE: "/",
    UPDATE_PROFILE: "/",
    CHANGE_PASSWORD: "/password",
    CANCEL_SUBSCRIPTION: "/subscription/cancel",
  },

  INTERVIEW: {
    GENERATE_INTERVIEW: "/interview",
    GET_ONE: "/interview/:interviewId",
    GET_ALL: "/interviews",
    START: "/interview/:interviewId/start",
    SUBMIT: "/interview/:interviewId/submit",
    COMPLETE: "/interview/:interviewId/complete",
    GET_RESULT: "/interview/:interviewId/result",
  },

  FLASHCARD: {
    GENERATE: "/flashcards",
    GET_ALL: "/flashcards",
    GET_ONE: "/flashcards/:flashcardSetId",
    DELETE: "/flashcards/:flashcardSetId",
  },

  DASHBOARD: {
    GET_SUMMARY: "/",
  },

  ADMIN_ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    AI: "/analytics/ai",
    USERS: "/analytics/users",
    DOCUMENTS: "/analytics/documents",
    REVENUE: "/analytics/revenue",
  },
};