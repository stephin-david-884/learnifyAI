import { UserSubscription } from "../../../domain/entities/UserSubscription.entity";
import { ISubscriptionService } from "../../interfaces/services/subscription/ISubscriptionService";
import { IGetActiveSubscriptionUseCase } from "../../interfaces/usecases/subscription/IGetActiveSubscriptionUseCase";

export class GetActiveSubscriptionUseCase implements IGetActiveSubscriptionUseCase {
    constructor(
        private readonly _subscriptionService: ISubscriptionService
    ) { }

    async execute(userId: string): Promise<UserSubscription | null> {
        
        return await this._subscriptionService.getActiveSubscription(userId);
    }
}