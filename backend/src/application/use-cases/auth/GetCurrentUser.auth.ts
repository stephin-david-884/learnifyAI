import { AppError } from "../../../domain/errors/AppError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IGetCurrentUsecase } from "../../interfaces/usecases/auth/IGetCurrentUsecase";


export class GetCurrentUser implements IGetCurrentUsecase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(accessToken: string) {
    const payload = this.tokenService.verifyAccessToken(accessToken);

    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new AppError(authMessages.error.USER_NOT_FOUND, statusCode.NOT_FOUND);
    }

    return {
      id: user.getId(),
      name: user.name,
      email: user.email,
      subscriptionPlan: user.subscriptionPlan,
      credits: user.credits,
      isBlocked: user.isBlocked
    };
  }
}