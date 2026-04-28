import { AppError } from "../../../../domain/errors/AppError";
import { IAdminRepository } from "../../../../domain/repositories/IAdminRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { authMessages } from "../../../constants/messages/authMessages";
import { GetCurrentAdminOutputDTO } from "../../../dtos/admin/auth/getCurrentAdmin.dto";
import { ITokenService } from "../../../interfaces/services/ITokenService";
import { IGetCurrentAdminUsecase } from "../../../interfaces/usecases/admin/auth/IGetCurrentAdminUsecase";


export class GetCurrentAdmin implements IGetCurrentAdminUsecase {
  constructor(
    private adminRepository: IAdminRepository,
    private tokenService: ITokenService
  ) {}

  async execute(accessToken: string): Promise<GetCurrentAdminOutputDTO> {
    const payload = this.tokenService.verifyAccessToken(accessToken);

    
    if (payload.type !== "ADMIN") {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCode.FORBIDDEN
      );
    }

    const admin = await this.adminRepository.findById(payload.userId);

    if (!admin) {
      throw new AppError(
        authMessages.error.ADMIN_NOT_FOUND,
        statusCode.NOT_FOUND
      );
    }

    return {
      id: admin.getId(),
      name: admin.name,
      email: admin.email,
    };
  }
}