import { UserSubscription } from "../../../../domain/entities/UserSubscription.entity";
import { VerifyPaymentDTO } from "../../../dtos/subscription/payment.subscription.dto";

export interface IVerifyPaymentAndActivateSubscriptionUseCase {
    execute(data: VerifyPaymentDTO): Promise<UserSubscription>;
}