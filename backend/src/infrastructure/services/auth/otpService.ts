import { IOtpService } from "../../../application/interfaces/services/IOtpservice";
import { logger } from "../log/logger";

export class OtpService implements IOtpService {
  generate(): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    logger.info(`OTP: ${otp}`);
    return otp.toString();
  }
}