import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { profileMessages } from "../../constants/messages/profileMessages";
import { ChangePasswordDTO } from "../../dtos/profile/ChangePasswordDTO";
import { IHashService } from "../../interfaces/services/IHashService";
import { IChangePasswordUseCase } from "../../interfaces/usecases/profile/IChangePasswordUseCase";

export class ChangePasswordUseCase implements IChangePasswordUseCase {

    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _hashService: IHashService
    ) {}

    async execute(data: ChangePasswordDTO): Promise<void> {
        
        const user = await this._userRepository.findById(data.userId);

        if(!user) {
            throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if(!user.hasPassword()) {
            throw new AppError(profileMessages.error.PASSWORD_CHANGE_NOT_ALLOWED, statusCode.BAD_REQUEST);
        }

        const currentHash = user.getPassword();

        const isPasswordCorrect = await this._hashService.compare(data.currentPassword, currentHash!);

        if(!isPasswordCorrect) {
            throw new AppError(profileMessages.error.INCORRECT_PASSWORD, statusCode.BAD_REQUEST);
        }

        if(data.currentPassword === data.newPassword) {
            throw new AppError(profileMessages.error.CHOOSE_DIFF_PASSWORD, statusCode.BAD_REQUEST);
        }

        const hashedPassword = await this._hashService.hash(data.newPassword);

        user.setPassword(hashedPassword);

        await this._userRepository.save(user);
    }
}