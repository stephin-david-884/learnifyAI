import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUserSubscriptionRepository } from "../../../domain/repositories/IUserSubscriptionRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { FREE_SUBSCRIPTION } from "../../constants/enums/subscription.constants";
import { authMessages } from "../../constants/messages/authMessages";
import { subMessages } from "../../constants/messages/subMessags";
import { CancelSubscriptionDTO } from "../../dtos/profile/CancelSubscriptionDTO";
import { ICancelSubscriptionUseCase } from "../../interfaces/usecases/subscription/ICancelSubscriptionUseCase";

export class CancelSubscriptionUseCase implements ICancelSubscriptionUseCase {

    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _userSubscriptionRepository: IUserSubscriptionRepository
    ) { }

    async execute(data: CancelSubscriptionDTO): Promise<void> {

        const subscription = await this._userSubscriptionRepository
            .findActiveByUserId(data.userId);

        if(!subscription) {
            throw new AppError(subMessages.error.NO_ACTIVE_SUBSCRIPTION, statusCode.BAD_REQUEST);
        }    

        subscription.cancel();

        await this._userSubscriptionRepository.save(subscription);

        const user = await this._userRepository.findById(data.userId);

        if(!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        user.subscriptionPlan = FREE_SUBSCRIPTION.PLAN_NAME;

        user.credits = FREE_SUBSCRIPTION.CREDITS;

        await this._userRepository.save(user);
    }
}