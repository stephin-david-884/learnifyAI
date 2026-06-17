import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUserSubscriptionRepository } from "../../../domain/repositories/IUserSubscriptionRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { GetProfileResponseDTO } from "../../dtos/profile/GetProfileResponseDTO";
import { IGetProfileUseCase } from "../../interfaces/usecases/profile/IGetProfileUseCase";

export class GetProfileUseCase implements IGetProfileUseCase {

    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _userSubscriptionRepository: IUserSubscriptionRepository
    ) { }

    async execute(userId: string): Promise<GetProfileResponseDTO> {

        const user = await this._userRepository.findById(userId);

        if (!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        const subscription = await this._userSubscriptionRepository.findActiveByUserId(userId);

        return {
            id: user.getId(),
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,

            accountType: user.getAccountType(),

            subscription: subscription
                ? {
                    planName:
                        subscription.planSnapshot.name,

                    status:
                        subscription.status,

                    billingCycle:
                        subscription.planSnapshot.billingCycle,

                    creditsRemaining:
                        subscription.creditsRemaining,

                    creditsTotal:
                        subscription.creditsTotal,

                    startDate:
                        subscription.startDate,

                    endDate:
                        subscription.endDate,
                }
                : null,
        };
    }
}
