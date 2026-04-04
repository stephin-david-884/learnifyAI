import { IMailService } from "../../../application/interfaces/services/IMailService";
import { createMailerTransporter } from "../../config/mail.config";
import { OtpMailPayload } from "../../../application/interfaces/services/mail.types";
import { generateOtpTemplate } from "../../emailTemplate/OtpTemplate";

export class MailService implements IMailService<OtpMailPayload> {
    private transporter = createMailerTransporter();

    async send(payload: OtpMailPayload): Promise<void> {

        const { to, name, otp } = payload;
        const html = generateOtpTemplate(otp, name);

        await this.transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject: "Your OTP Code",
            html
        });
    }
}

