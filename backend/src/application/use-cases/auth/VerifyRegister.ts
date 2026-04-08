// import { AppError } from "../../../domain/errors/AppError";
// import { ITokenRepository } from "../../../domain/repositories/ITokenRepository";
// import { IUserRepository } from "../../../domain/repositories/IUserRepository";
// import { statusCode } from "../../constants/enums/statusCode";
// import { authMessages } from "../../constants/messages/authMessages";
// import { VerifyRegisterInputDTO, VerifyRegisterOutputDTO } from "../../dtos/verifyRegister.auth.dto";
// import { IHashService } from "../../interfaces/services/IHashService";
// import { ILogger } from "../../interfaces/services/ILogger";
// import { IOtpService } from "../../interfaces/services/IOtpservice";
// import { IOtpStore } from "../../interfaces/services/IOtpStore";
// import { ITempUserStore } from "../../interfaces/services/ITempUserStore";
// import { ITokenService } from "../../interfaces/services/ITokenService";

// export class VerifyRegister {
//     constructor(
//         private userRepository: IUserRepository,
//         private otpStore: IOtpStore,
//         private otpService: IOtpService,
//         private tokenService: ITokenService,
//         private tokenRepository: ITokenRepository,
//         private tempUserStore: ITempUserStore,
//         private hashService: IHashService,
//         private logger: ILogger
//     ){}

//     async execute(data: VerifyRegisterInputDTO): Promise<VerifyRegisterOutputDTO> {
//         const { email, otp } = data;

//         //Fetch OTP
//         const storedOTP = await this.otpStore.getOtp(email);
//         if(!storedOTP) {
//             throw new AppError(
//                 authMessages.error.OTP_EXPIRED,
//                 statusCode.BAD_REQUEST
//             );
//         }

//         //Compare OTP
//         const isValidOTP = await this.hashService.compare(otp, storedOTP);
//         if(!isValidOTP) {
//             throw new AppError(
//                 authMessages.error.INVALID_OTP,
//                 statusCode.BAD_REQUEST
//             );
//         }

//         //Get temporary stored data
//         const tempUser = await this.tempUserStore.get(email);
//         if(!tempUser) {
//             throw new AppError(
//                 authMessages.error.REG_SESSION_EXPIRED,
//                 statusCode.BAD_REQUEST
//             )
//         }

//         //Create user
//         const createdUser = await this.userRepository.save({
//             name: tempUser.name,
//             email: tempUser.email,
//             password: tempUser.password,
//             subscriptionPlan: "FREE",
//             credits:20,
//             isBlocked: false
//         });

//         //Generate token
//         const accessToken = this.tokenService.generateAccessToken({
//             userId: createdUser.id!,
//             email: createdUser.email
//         });

//         const refreshToken = this.tokenService.generateRefreshToken({
//             userId: createdUser.id!
//         })
//     }
// }