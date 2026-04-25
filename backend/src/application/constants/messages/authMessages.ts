export const authMessages = {
    success: {
        REGISTER_SUCCESS: "User registered successfully",
        USER_LOGIN_SUCCESS: "User logged in successfully",
        ADMIN_LOGIN_SUCCESS: "Admin logged in successfully",
        USER_LOGGEDOUT_SUCCESS: "User logged out successfully", 
        ADMIN_LOGOUT_SUCCESS: "Admin logged out successfully",
        OTP_SEND_SUCCESS: "OTP sent successfully to the email", 
        RESET_PASSWORD_OTP_SEND: "OTP for password reset sent successfully",
        PASSWORD_RESET: "Password reset successfully",
        OTP_VERIFIED: 'Otp verified successfully',
        TOKEN_REFRESHED: "Token refreshed successfully",
    },

    error: {
        INTERNAL_SERVER_ERROR: "Internal server error",
        BAD_REQUEST: "Invalid email or password",
        CONFLICT: "Email already exists",
        UNAUTHORIZED: "Unauthorized access",
        INVALID_PASSWORD: "Invalid password",
        EMAIL_NOT_FOUND: "Email not found",
        OTP_EXPIRED: "OTP has expired",
        INVALID_OTP: "Invalid OTP",
        ALREADY_VERIFIED: "User is already verified",
        ENV_VALIDATION_FAILED: "Environment validation failed",
        ACCESS_TOKEN_EXPIRED: "Access token has expired",
        REFRESH_TOKEN_NOT_FOUND: "Refresh token is missing",
        INVALID_REFRESH_TOKEN: "Invalid refresh token payload",
        INVALID_CSRF_TOKEN:"Invalid CSRF token",
        REFRESH_TOKEN_SECRET_NOT_FOUND: "Refresh token secret is not available",
        ACCESS_TOKEN_SECRET_NOT_FOUND: "Access token secret is not available",
        INVALID_GOOGLE_ID: "Invalid Google ID",
        INVALID_GOOGLE_TOKEN_PAYLOAD: "Invalid Google token payload",
        GOOGLE_TOKEN_VERIFICATION_FAILURE: "Failed to verify Google token",
        GOOGLE_MAIL_VERIFICATION_FAILURE: "Google email not verified",
        REG_SESSION_EXPIRED: "Registration session expired",
        SAVE_FAILED: "Save Failed",
        ENTITY_NOT_FOUND:"Entity not found",

       // User Errors
        USER_NOT_FOUND: "User not found",
        USER_ID_NOT_FOUND: "User ID not found",
        USER_ALREADY_EXISTS: "User with this email already exists",
        USER_BLOCKED: "User is blocked by the admin",
        USER_SAVE_FAILED: "Failed to save user",

        // Admin Errors
        ADMIN_NOT_FOUND: "Admin not found"
    }
}