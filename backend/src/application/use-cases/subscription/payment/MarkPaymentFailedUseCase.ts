import { AppError } from "../../../../domain/errors/AppError";
import { IPaymentRepository } from "../../../../domain/repositories/IPaymentRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { subMessages } from "../../../constants/messages/subMessags";
import { MarkPaymentFailedDTO } from "../../../dtos/payment/MarkPaymentFailedDTO";
import { IMarkPaymentFailedUseCase } from "../../../interfaces/usecases/subscription/IMarkPaymentFailedUseCase";

export class MarkPaymentFailedUseCase implements IMarkPaymentFailedUseCase {

    constructor(
        private readonly _paymentRepository: IPaymentRepository
    ){}

    async execute(data: MarkPaymentFailedDTO): Promise<void> {
        
        const payment = await this._paymentRepository.findByOrderId(data.razorpayOrderId);

        if(!payment) {
            throw new AppError(subMessages.error.PAYMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if(payment.isSuccessful()) {
            return
        }

        payment.markFailed();

        await this._paymentRepository.save(payment);
    }
}