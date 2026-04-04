import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IOtpStore } from "../../interfaces/services/IOtpStore";
import { RegisterInputDTO, RegisterOutputDTO } from "../../dtos/auth.dto";
import { IOtpService } from "../../interfaces/services/IOtpservice";
import { ILogger } from "../../interfaces/services/ILogger";
import { IHashService } from "../../interfaces/services/IHashService";
import { IMailService } from "../../interfaces/services/IMailService";
import { OtpMailPayload } from "../../interfaces/services/mail.types";
import { ITempUserStore } from "../../interfaces/services/ITempUserStore";

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private otpService: IOtpService,
    private logger: ILogger,
    private hashService: IHashService,
    private otpStore: IOtpStore,
    private mailService: IMailService<OtpMailPayload>,
    private tempUserStore: ITempUserStore
  ) { }

  async execute(data: RegisterInputDTO): Promise<RegisterOutputDTO> {
    const { name, email, password } = data;

    //Check if user exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    //Hash password
    const hashedPassword = await this.hashService.hash(password);

    //Generate OTP
    const otp = this.otpService.generate();

    //Hash OTP
    const hashedOtp = await this.hashService.hash(otp);

    // Store OTP in Redis
    await this.otpStore.saveOtp(email, hashedOtp, 120);

    if (process.env.NODE_ENV !== "production") {
      this.logger.info(`OTP for ${email}: ${otp}`);
    }

    //Store temporary data
    await this.tempUserStore.save(
      email,
      { name, email, password: hashedPassword },
      300
    );

    //Send OTP
    await this.mailService.send({
      to: email,
      name,
      otp
    });

    return {
      success: true,
      message: "OTP sent successfully"
    }
  }
}