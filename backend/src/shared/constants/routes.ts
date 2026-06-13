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
    RESET_PASSWORD: "/resetpassword"
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
};