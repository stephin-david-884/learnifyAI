export interface CreatePaymentOrderUseCaseInputDTO {
    userId: string;
    planId: string;
}

export interface CreatePaymentOrderUseCaseOutputDTO {
    paymentId: string;

    orderId: string;

    amount: number;

    currency: string;

    key: string;

    planName: string;
}