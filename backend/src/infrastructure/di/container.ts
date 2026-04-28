import "../../config/env"
import { UserRepository } from "../repositories/UserRepository";
import { redisClient } from "../config/redis.config";

//services
import { HashService } from "../services/auth/hashService";
import { OtpService } from "../services/auth/otpService";
import { TokenService } from "../services/auth/TokenService";
import { MailService } from "../services/auth/MailService";
import { TempUserStore } from "../services/auth/TempUserStore";
import { OtpStore } from "../services/auth/otpStore";
import { GoogleAuthService } from "../services/auth/GoogleAuthService";

//use-cases
import { RegisterUser } from "../../application/use-cases/auth/RegisterUser.auth";
import { VerifyRegister } from "../../application/use-cases/auth/VerifyRegister";
import { ResendOtp } from "../../application/use-cases/auth/resendOtp.auth";
import { RefreshToken } from "../../application/use-cases/auth/RefreshToken.auth";
import { GetCurrentUser } from "../../application/use-cases/auth/GetCurrentUser.auth";
import { Logout } from "../../application/use-cases/auth/Logout.auth";


//Controller
import { AuthController } from "../../interfaces/controllers/auth/AuthController";


import { logger } from "../services/log/logger";
//interfaces
import { IRegisterUserUsecase } from "../../application/interfaces/usecases/auth/IRegisterUserUsecase";
import { IVerifyRegisterUsecase } from "../../application/interfaces/usecases/auth/IVerifyRegisterUsecase";
import { IResendOtpUsecase } from "../../application/interfaces/usecases/auth/IResendOtpUsecase";
import { IRefreshTokenUseCase } from "../../application/interfaces/usecases/auth/IRefreshTokenUsecase";
import { IGetCurrentUsecase } from "../../application/interfaces/usecases/auth/IGetCurrentUsecase";
import { ILogoutUsecase } from "../../application/interfaces/usecases/auth/ILogoutUsecase";
import { IGoogleAuthUsecase } from "../../application/interfaces/usecases/auth/IGoogleAuthUsecase";
import { GoogleAuth } from "../../application/use-cases/auth/GoogleAuth";
import { ILoginUsecase } from "../../application/interfaces/usecases/auth/ILoginUsecase";
import { LoginUser } from "../../application/use-cases/auth/LoginUser.auth";
import { IForgotPasswordUsecase } from "../../application/interfaces/usecases/auth/IForgotPasswordUsecase";
import { ForgotPassword } from "../../application/use-cases/auth/ForgotPassword.auth";
import { IVerifyForgotPasswordUsecase } from "../../application/interfaces/usecases/auth/IVerifyForgotPasswordUsecase";
import { VerifyForgotPasswordOtp } from "../../application/use-cases/auth/VerifyForgotPassword.auth";
import { IResetPasswordUsecase } from "../../application/interfaces/usecases/auth/IResetPasswordUsecase";
import { ResetPassword } from "../../application/use-cases/auth/ResetPassword.auth";
import { AdminRepository } from "../repositories/AdminRepository";
import { IAdminLoginUsecase } from "../../application/interfaces/usecases/admin/auth/IAdminLoginUsecase";
import { AdminLogin } from "../../application/use-cases/admin/auth/AdminLogin";
import { AdminController } from "../../interfaces/controllers/admin/AdminController";

//Instances
const userRepository = new UserRepository();
const hashService = new HashService();
const otpService = new OtpService();
const tokenService = new TokenService();
const mailService = new MailService();
const otpStore = new OtpStore(redisClient);
const tempUserStore = new TempUserStore(redisClient);
const googleAuthService = new GoogleAuthService();
const adminRepository = new AdminRepository();

//Use cases
const registerUser: IRegisterUserUsecase = new RegisterUser(
  userRepository,
  otpService,
  logger,
  hashService,
  otpStore,
  mailService,
  tempUserStore
);

const verifyRegister: IVerifyRegisterUsecase = new VerifyRegister(
    userRepository,
    otpStore,
    tokenService,
    tempUserStore,
    hashService,
);

const resendOtp:IResendOtpUsecase = new ResendOtp(
    otpService,
    otpStore,
    mailService,
    hashService,
    tempUserStore
);

const refreshToken: IRefreshTokenUseCase = new RefreshToken(
    userRepository,
    adminRepository,
    tokenService,
    hashService,
);

const getCurrentUser: IGetCurrentUsecase = new GetCurrentUser(
    userRepository,
    tokenService
)

const logout: ILogoutUsecase = new Logout(
    userRepository,
    tokenService,
    hashService
)

const googleAuth: IGoogleAuthUsecase = new GoogleAuth(
    userRepository,
    googleAuthService,
    tokenService,
    hashService
)

const login: ILoginUsecase = new LoginUser(
    userRepository,
    tokenService,
    hashService
)

const forgotPassword: IForgotPasswordUsecase = new ForgotPassword(
    userRepository,
    otpService,
    otpStore,
    mailService,
    hashService
)

const verifyForgotpassword: IVerifyForgotPasswordUsecase = new VerifyForgotPasswordOtp(
    otpStore,
    hashService,
    tokenService
)

const resetPassword: IResetPasswordUsecase = new ResetPassword(
    userRepository,
    hashService,
    tokenService
)

//admin usecases
const adminLogin: IAdminLoginUsecase = new AdminLogin(
    adminRepository,
    tokenService,
    hashService
)

export const authController = new AuthController(
    registerUser,
    verifyRegister,
    resendOtp,
    refreshToken,
    getCurrentUser,
    logout,
    googleAuth,
    login,
    forgotPassword,
    verifyForgotpassword,
    resetPassword
)

export const adminController = new AdminController(
    adminLogin,
    refreshToken
)

export { tokenService };
