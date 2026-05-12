import { AppError } from "../../../../domain/errors/AppError";
import { statusCode } from "../../../constants/enums/statusCode";
import { subMessages } from "../../../constants/messages/subMessags";
import { CreditStatusDTO } from "../../../dtos/subscription/credit-status.dto";
import { ISubscriptionService } from "../../../interfaces/services/subscription/ISubscriptionService";
import { IGetCreditStatusUseCase } from "../../../interfaces/usecases/subscription/IGetCreditStatusUseCase";

export class GetCreditStatusUseCase implements IGetCreditStatusUseCase {

    constructor(
        private readonly _subscriptionService: ISubscriptionService
    ) { }

    async execute(userId: string): Promise<CreditStatusDTO> {

        const subscription = await this._subscriptionService.getActiveSubscription(userId);

        if (!subscription) {
            throw new AppError(subMessages.error.SUBSCRIPTION_NOT_FOUND, statusCode.NOT_FOUND);
        }

        return {
            subscriptionId: subscription.getId(),

            status: subscription.status,

            planName: subscription.planSnapshot.name,

            creditsRemaining:
                subscription.creditsRemaining,

            creditsTotal:
                subscription.creditsTotal,

            lastCreditReset:
                subscription.lastCreditReset,

            endDate:
                subscription.endDate,
        }
    }
}