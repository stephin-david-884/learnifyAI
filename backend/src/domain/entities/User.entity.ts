export type SubscriptionPlan = "FREE" | "PRO";

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    private password?: string,
    public googleId?: string,

    public subscriptionPlan: SubscriptionPlan = "FREE",
    public credits: number = 20,
    public isBlocked: boolean = false,
    public subscriptionExpiresAt?: Date,

    public profileImage?: string,

    private refreshTokens: string[] = []
  ) {}

  upgradeToPro(expiry: Date) {
    this.subscriptionPlan = "PRO";
    this.subscriptionExpiresAt = expiry;
  }

  consumeCredits(amount: number) {
    if (this.credits < amount) {
      throw new Error("Not enough credits");
    }
    this.credits -= amount;
  }

  block() {
    this.isBlocked = true;
  }

  getPassword() {
    return this.password;
  }

  setPassword(hashedPassword: string) {
    this.password = hashedPassword;
  }

  addRefreshToken(token: string) {
    this.refreshTokens.push(token);
  }

  removeRefreshToken(token: string) {
    this.refreshTokens = this.refreshTokens.filter(t => t !== token);
  }

  getRefreshTokens() {
    return this.refreshTokens;
  }
}

export type NewUser = {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  profileImage?: string;
};