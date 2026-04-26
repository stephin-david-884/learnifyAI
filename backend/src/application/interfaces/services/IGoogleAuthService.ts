import { GoogleAuthDTO } from "../../dtos/auth/googleAuth.dto";

export interface IGoogleAuthService {
    verifyIdToken(idToken: string): Promise<GoogleAuthDTO>;
}