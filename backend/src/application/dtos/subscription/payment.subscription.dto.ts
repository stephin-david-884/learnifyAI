export interface CreatePaymentOrderInputDTO {
    amount: number;
    receipt: string;
}

export interface CreatePaymentOrderOutputDTO {
    orderId: string;
    amount: number;
    currency: string;
}

export interface VerifyPaymentDTO {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}