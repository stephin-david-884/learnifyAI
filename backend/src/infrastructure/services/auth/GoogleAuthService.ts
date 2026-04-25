import { GoogleAuthDTO } from "../../../application/dtos/googleAuth.dto";
import { IGoogleAuthService } from "../../../application/interfaces/services/IGoogleAuthService";
import { OAuth2Client } from "google-auth-library"
import { AppError } from "../../../domain/errors/AppError";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { logError } from "../log/logger";

export class GoogleAuthService implements IGoogleAuthService {
    private client: OAuth2Client;

    constructor() {
        this.client = new OAuth2Client()
    }

    async verifyIdToken(idToken: string): Promise<GoogleAuthDTO> {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            if (!payload || !payload.email) {
                throw new AppError(
                    authMessages.error.INVALID_GOOGLE_TOKEN_PAYLOAD,
                    statusCode.FORBIDDEN
                );
            }

            return {
                googleId: payload.sub,
                email: payload.email,
                name: payload.name || "Unknown User",
                isEmailVerified: payload.email_verified ?? false,
            }
        } catch (error) {
            logError(error, "Google token verification failed");

            throw new AppError(
                authMessages.error.GOOGLE_TOKEN_VERIFICATION_FAILURE,
                statusCode.FORBIDDEN
            );
        }
    }
}