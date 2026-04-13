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

//use-cases
import { RegisterUser } from "../../application/use-cases/auth/RegisterUser.auth";
import { VerifyRegister } from "../../application/use-cases/auth/VerifyRegister";
import { ResendOtp } from "../../application/use-cases/auth/resendOtp.auth";
import { RefreshToken } from "../../application/use-cases/auth/RefreshToken.auth";

//Controller
import { AuthController } from "../../interfaces/controllers/auth/AuthController";
import { logger } from "../services/log/logger";

//Instances
const userRepository = new UserRepository();
const hashService = new HashService();
const otpService = new OtpService();
const tokenService = new TokenService();
const mailService = new MailService();
const otpStore = new OtpStore(redisClient);
const tempUserStore = new TempUserStore(redisClient);

//Use cases
const registerUser = new RegisterUser(
  userRepository,
  otpService,
  logger,
  hashService,
  otpStore,
  mailService,
  tempUserStore
);

const verifyRegister = new VerifyRegister(
    userRepository,
    otpStore,
    tokenService,
    tempUserStore,
    hashService,
);

const resendOtp = new ResendOtp(
    otpService,
    otpStore,
    mailService,
    hashService,
    tempUserStore
);

const refreshToken = new RefreshToken(
    userRepository,
    tokenService,
    hashService,
)

// Controller
export const authController = new AuthController(
    registerUser,
    verifyRegister,
    resendOtp,
    refreshToken
)
