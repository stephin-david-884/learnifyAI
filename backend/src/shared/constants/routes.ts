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
  }
};