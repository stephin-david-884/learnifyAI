export interface ITokenRepository {
    updateToken(id: string, token: string): Promise<void>;
}