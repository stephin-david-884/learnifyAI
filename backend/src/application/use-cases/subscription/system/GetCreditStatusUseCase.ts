import { FREE_SUBSCRIPTION } from "../../../constants/enums/subscription.constants";
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
            return {
                subscriptionId: null,

                status: "FREE",

                planName:
                    FREE_SUBSCRIPTION.PLAN_NAME,

                creditsRemaining:
                    FREE_SUBSCRIPTION.CREDITS,

                creditsTotal:
                    FREE_SUBSCRIPTION.CREDITS,

                lastCreditReset: null,

                endDate: null,

                isPro: false,
            };
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

            isPro: true,    
        }
    }
}