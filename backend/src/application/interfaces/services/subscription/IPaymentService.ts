import { CreatePaymentOrderInputDTO, CreatePaymentOrderOutputDTO, VerifyPaymentDTO } from "../../../dtos/subscription/payment.subscription.dto";

export interface IPaymentService {
    createOrder( data: CreatePaymentOrderInputDTO ): Promise<CreatePaymentOrderOutputDTO>;

    verifySignature( data: VerifyPaymentDTO ): Promise<boolean>;
}