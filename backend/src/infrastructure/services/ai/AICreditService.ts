import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { IAICreditService } from "../../../application/interfaces/services/ai/IAICreditService";
import { ISubscriptionService } from "../../../application/interfaces/services/subscription/ISubscriptionService";
import { IConsumeCreditsUseCase } from "../../../application/interfaces/usecases/subscription/IConsumeCreditsUseCase";
import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class AICreditService implements IAICreditService {

    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _subscriptionService: ISubscriptionService,
        private readonly _consumeCreditsUseCase: IConsumeCreditsUseCase
    ) {}

    async consumeForAIUsage(userId: string, amount: number): Promise<void> {
        
        const subscription = await this._subscriptionService.getActiveSubscription(userId);

        if(subscription) {
            await this._consumeCreditsUseCase.execute({
                subscription,
                amount
            });

            return;
        }

        const user = await this._userRepository.findById(userId);

        if(!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        user.consumeCredits(amount);

        await this._userRepository.save(user);
    }
}