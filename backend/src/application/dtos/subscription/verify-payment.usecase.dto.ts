export interface VerifyPaymentAndActivateSubscriptionInputDTO {
    razorpayOrderId: string;

    razorpayPaymentId: string;

    razorpaySignature: string;
}