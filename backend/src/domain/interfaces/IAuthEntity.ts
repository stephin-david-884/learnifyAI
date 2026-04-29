export interface IAuthEntity {
  getId(): string;
  getRefreshTokens(): string[];
  removeRefreshToken(token: string): void;
}