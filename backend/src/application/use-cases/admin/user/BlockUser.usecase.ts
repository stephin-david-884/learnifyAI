import { AppError } from "../../../../domain/errors/AppError";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { authMessages } from "../../../constants/messages/authMessages";
import { BlockUserInputDTO, BlockUserOutputDTO } from "../../../dtos/userManagement/blockUser.dto";
import { IBlockUserUseCase } from "../../../interfaces/usecases/admin/user/IBlockUserUseCase";


export class BlockUserUseCase implements IBlockUserUseCase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: BlockUserInputDTO): Promise<BlockUserOutputDTO> {
        const user = await this.userRepository.findById(data.userId);

        if (!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (data.action === "BLOCK") {
            user.block();
        } else {
            user.isBlocked = false;
        }

        const updatedUser = await this.userRepository.save(user);

        return {
            userId: updatedUser.getId(),
            isBlocked: updatedUser.isBlocked,
        };
    }
}