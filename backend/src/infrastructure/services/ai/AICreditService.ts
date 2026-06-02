import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { subMessages } from "../../../application/constants/messages/subMessags";
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

    async validateCredits(userId: string, amount: number): Promise<void> {
        
        const subscription = await this._subscriptionService.getActiveSubscription(userId);

        if(subscription) {

            if(subscription.creditsRemaining < amount) {
                throw new AppError(subMessages.error.INSUFFICIENT_CREDITS, statusCode.BAD_REQUEST);
            }

            return;
        }

        const user = await this._userRepository.findById(userId);

        if(!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if(user.credits < amount) {
            throw new AppError(subMessages.error.INSUFFICIENT_CREDITS, statusCode.BAD_REQUEST);
        }
    }

    async consumeCredits(userId: string, amount: number): Promise<void> {
        
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