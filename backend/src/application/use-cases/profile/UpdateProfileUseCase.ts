import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { profileMessages } from "../../constants/messages/profileMessages";
import { UpdateProfileDTO, UpdateProfileResponseDTO } from "../../dtos/profile/update-profile.dto";
import { IUpdateProfileUseCase } from "../../interfaces/usecases/profile/IUpdateProfileUseCase";

export class UpdateProfileUseCase implements IUpdateProfileUseCase {

    constructor(
        private readonly _userRepository: IUserRepository,
    ) {}

    async execute(data: UpdateProfileDTO): Promise<UpdateProfileResponseDTO> {
        
        const user = await this._userRepository.findById(data.userId);

        if(!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        const trimmedName = data.name.trim();

        if(!trimmedName) {
            throw new AppError(profileMessages.error.NAME_REQUIRED, statusCode.BAD_REQUEST);
        }

        user.updateName(trimmedName);

        const updatedUser = await this._userRepository.save(user);

        return {
            id: updatedUser.getId(),
            name: updatedUser.name,
            email: updatedUser.email,
        }
    }
}