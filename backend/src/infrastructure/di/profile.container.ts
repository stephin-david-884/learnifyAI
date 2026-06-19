import { IGetProfileUseCase } from "../../application/interfaces/usecases/profile/IGetProfileUseCase";
import { ChangePasswordUseCase } from "../../application/use-cases/profile/ChangePasswordUseCase";
import { GetProfileUseCase } from "../../application/use-cases/profile/GetProfileUseCase";
import { UpdateProfileUseCase } from "../../application/use-cases/profile/UpdateProfileUseCase";
import { CancelSubscriptionUseCase } from "../../application/use-cases/subscription/CancelSubscriptionUseCase";
import { ProfileController } from "../../interfaces/controllers/profile/ProfileController";
import { UserRepository } from "../repositories/UserRepository";
import { UserSubscriptionRepository } from "../repositories/UserSubscriptionRepository";
import { HashService } from "../services/auth/hashService";

const userRepository = new UserRepository();
const userSubscriptionRepository = new UserSubscriptionRepository();

const hashService = new HashService();

const getProfileUseCase: IGetProfileUseCase =
    new GetProfileUseCase(
        userRepository,
        userSubscriptionRepository
    );

const updateProfileUseCase = new UpdateProfileUseCase(
    userRepository
);

const changePasswordUseCase = new ChangePasswordUseCase(
    userRepository,
    hashService
)

const cancelSubscripitonUseCase = new CancelSubscriptionUseCase(
    userRepository,
    userSubscriptionRepository
)

export const profileController =
    new ProfileController(
        getProfileUseCase,
        updateProfileUseCase,
        changePasswordUseCase,
        cancelSubscripitonUseCase   
    );    