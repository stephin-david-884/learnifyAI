import { User } from "../../../domain/entities/User.entity";
import { AppError } from "../../../domain/errors/AppError";
// import { ITokenRepository } from "../../../domain/repositories/ITokenRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { VerifyRegisterInputDTO, VerifyRegisterOutputDTO } from "../../dtos/verifyRegister.auth.dto";
import { IHashService } from "../../interfaces/services/IHashService";
// import { IOtpService } from "../../interfaces/services/IOtpservice";
import { IOtpStore } from "../../interfaces/services/IOtpStore";
import { ITempUserStore } from "../../interfaces/services/ITempUserStore";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IVerifyRegisterUsecase } from "../../interfaces/usecases/auth/IVerifyRegisterUsecase";

export class VerifyRegister implements IVerifyRegisterUsecase{
    constructor(
        private userRepository: IUserRepository,
        private otpStore: IOtpStore,
        // private otpService: IOtpService,
        private tokenService: ITokenService,
        // private tokenRepository: ITokenRepository,
        private tempUserStore: ITempUserStore,
        private hashService: IHashService,
    ) { }

    async execute(data: VerifyRegisterInputDTO): Promise<VerifyRegisterOutputDTO> {
        const { email, otp } = data;

        //Fetch OTP
        const storedOTP = await this.otpStore.getOtp(email);
        if (!storedOTP) {
            throw new AppError(
                authMessages.error.OTP_EXPIRED,
                statusCode.BAD_REQUEST
            );
        }

        //Compare OTP
        const isValidOTP = await this.hashService.compare(otp, storedOTP);
        if (!isValidOTP) {
            throw new AppError(
                authMessages.error.INVALID_OTP,
                statusCode.BAD_REQUEST
            );
        }

        //Get temporary stored data
        const tempUser = await this.tempUserStore.get(email);
        if (!tempUser) {
            throw new AppError(
                authMessages.error.REG_SESSION_EXPIRED,
                statusCode.BAD_REQUEST
            )
        }

        //check existing user
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError(
                authMessages.error.USER_ALREADY_EXISTS,
                statusCode.BAD_REQUEST
            );
        }

        //Create user
        const user = new User({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password
        });

        //save user
        const createdUser = await this.userRepository.save(user)

        //Generate token
        const refreshToken = this.tokenService.generateRefreshToken({
            userId: createdUser.getId()
        })
        const accessToken = this.tokenService.generateAccessToken({
            userId: createdUser.getId(),
            email: createdUser.email
        });
        const csrfToken = this.tokenService.generateCsrfToken();

        const hashedRefreshToken = await this.hashService.hash(refreshToken);

        //add refresh token to entity
        createdUser.addRefreshToken(hashedRefreshToken);

        await this.userRepository.save(createdUser);

        //cleanup redis
        await this.otpStore.deleteOtp(email);
        await this.tempUserStore.delete(email);

        return {
            success: true,
            accessToken,
            refreshToken,
            csrfToken,
            user: {
                id: createdUser.getId(),
                name: createdUser.name,
                email: createdUser.email,
                subscriptionPlan: createdUser.subscriptionPlan,
                credits: createdUser.credits,
            }
        }


    }
}