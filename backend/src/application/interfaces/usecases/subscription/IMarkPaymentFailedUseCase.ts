import { MarkPaymentFailedDTO } from "../../../dtos/payment/MarkPaymentFailedDTO";

export interface IMarkPaymentFailedUseCase {
    execute(data: MarkPaymentFailedDTO): Promise<void>;
}