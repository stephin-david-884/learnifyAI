import { IGetProfileUseCase } from "../../application/interfaces/usecases/profile/IGetProfileUseCase";
import { GetProfileUseCase } from "../../application/use-cases/profile/GetProfileUseCase";
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

export const profileController =
    new ProfileController(
        getProfileUseCase
    );    