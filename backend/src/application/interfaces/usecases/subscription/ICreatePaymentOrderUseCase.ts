import { CreatePaymentOrderUseCaseInputDTO, CreatePaymentOrderUseCaseOutputDTO } from "../../../dtos/subscription/create-payment-order.usecase.dto";
// import { CreatePaymentOrderInputDTO, CreatePaymentOrderOutputDTO } from "../../../dtos/subscription/payment.subscription.dto";

export interface ICreatePaymentOrderUseCase {
    execute(data: CreatePaymentOrderUseCaseInputDTO): Promise<CreatePaymentOrderUseCaseOutputDTO>;
}