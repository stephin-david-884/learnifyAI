import { IGetProfileUseCase } from "../../application/interfaces/usecases/profile/IGetProfileUseCase";
import { GetProfileUseCase } from "../../application/use-cases/profile/GetProfileUseCase";
import { UpdateProfileUseCase } from "../../application/use-cases/profile/UpdateProfileUseCase";
import { ProfileController } from "../../interfaces/controllers/profile/ProfileController";
import { UserRepository } from "../repositories/UserRepository";
import { UserSubscriptionRepository } from "../repositories/UserSubscriptionRepository";

const userRepository = new UserRepository();
const userSubscriptionRepository = new UserSubscriptionRepository();

const getProfileUseCase: IGetProfileUseCase =
    new GetProfileUseCase(
        userRepository,
        userSubscriptionRepository
    );

const updateProfileUseCase = new UpdateProfileUseCase(
    userRepository
);

export const profileController =
    new ProfileController(
        getProfileUseCase,
        updateProfileUseCase
    );    