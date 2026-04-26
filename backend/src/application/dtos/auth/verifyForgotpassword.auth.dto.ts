export interface VerifyForgotPasswordOtpInputDTO {
    email: string
    otp: string
}

export interface VerifyForgotPasswordOtpOutputDTO {
    email: string
    resetToken: string
}