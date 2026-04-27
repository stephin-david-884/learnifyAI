import { AppError } from "../../../../domain/errors/AppError";
import { IAdminRepository } from "../../../../domain/repositories/IAdminRepository";
import { statusCode } from "../../../constants/enums/statusCode";
import { authMessages } from "../../../constants/messages/authMessages";
import { LoginAdminInputDTO, LoginAdminOutputDTO } from "../../../dtos/admin/auth/login.admin.dto";
import { IHashService } from "../../../interfaces/services/IHashService";
import { ITokenService } from "../../../interfaces/services/ITokenService";
import { IAdminLoginUsecase } from "../../../interfaces/usecases/admin/auth/IAdminLoginUsecase";

export class AdminLogin implements IAdminLoginUsecase {
    constructor(
        private adminRepository: IAdminRepository,
        private tokenService: ITokenService,
        private hashService: IHashService
    ) { }

    async execute(request: LoginAdminInputDTO): Promise<LoginAdminOutputDTO> {

        const admin = await this.adminRepository.findByEmail(request.email);

        if (!admin) {
            throw new AppError(
                authMessages.error.ADMIN_NOT_FOUND,
                statusCode.NOT_FOUND
            );
        }

        const password = admin.getPassword();

        if (!password) {
            throw new AppError(
                authMessages.error.INVALID_PASSWORD,
                statusCode.BAD_REQUEST
            );
        }

        const isValidPassword = await this.hashService.compare(request.password, password);

        if (!isValidPassword) {
            throw new AppError(
                authMessages.error.INVALID_PASSWORD,
                statusCode.BAD_REQUEST
            );
        }

        const accessToken = this.tokenService.generateAccessToken({
            userId: admin.getId(),
            email: admin.email,
            type: "ADMIN",
        });

        const refreshToken = this.tokenService.generateRefreshToken({
            userId: admin.getId(),
            type: "ADMIN",
        });

        const csrfToken = this.tokenService.generateCsrfToken();

        const hashedRefreshToken = await this.hashService.hash(refreshToken);

        admin.addRefreshToken(hashedRefreshToken);

        await this.adminRepository.save(admin);

        return {
            accessToken,
            refreshToken,
            csrfToken,
            admin: {
                id: admin.getId(),
                email: admin.email,
                name: admin.name,
            },
        };
    }
}