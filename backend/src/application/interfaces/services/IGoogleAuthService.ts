import { GoogleAuthDTO } from "../../dtos/googleAuth.dto";

export interface IGoogleAuthService {
    verifyIdToken(idToken: string): Promise<GoogleAuthDTO>;
}