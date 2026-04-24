import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { UserModel } from "../database/models/User";

export class TokenRepository implements ITokenRepository {
    async updateToken(id: string, token: string): Promise<void> {
        await UserModel.findByIdAndUpdate(id, {
            $push: {refreshToken: token}
        });
    }
}