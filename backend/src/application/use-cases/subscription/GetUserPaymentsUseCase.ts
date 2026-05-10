import { Payment } from "../../../domain/entities/Payment.entity";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IGetUserPaymentsUseCase } from "../../interfaces/usecases/subscription/IGetUserPaymentsUseCase";

export class GetUserPaymentsUseCase implements IGetUserPaymentsUseCase {

    constructor(
        private readonly _paymentRepository: IPaymentRepository
    ) { }

    async execute(userId: string): Promise<Payment[]> {
        
        return await this._paymentRepository.findByUserId(userId);
    }
}