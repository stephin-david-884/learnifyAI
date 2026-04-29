import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { GetAllUsersInputDTO, GetAllUsersOutputDTO } from "../../dtos/userManagement/getAllUsers.dto";
import { IGetAllUsersUsecase } from "../../interfaces/usecases/userManagement/IGetAllUsersUsecase";

export class GetAllUsers implements IGetAllUsersUsecase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(input: GetAllUsersInputDTO): Promise<GetAllUsersOutputDTO> {
        const page = input.page || 1;
        const limit = input.limit || 10;
        const search = input.search?.trim();

        const { users, total } = await this.userRepository.findAllPaginated(
            page,
            limit,
            search
        );

        return {
            users: users.map((user) => ({
                id: user.getId(),
                name: user.name,
                email: user.email,
                subscriptionPlan: user.subscriptionPlan,
                credits: user.credits,
                isBlocked: user.isBlocked,
                createdAt: user.subscriptionExpiresAt || new Date()
            })),
            total,
            page,
            limit
        };
    }
}