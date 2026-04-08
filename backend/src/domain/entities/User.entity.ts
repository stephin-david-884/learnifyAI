export type SubscriptionPlan = "FREE" | "PRO";

export class User {
  public readonly id?: string;
  public name: string;
  public email: string;
  private password?: string;
  public googleId?: string;

  public subscriptionPlan: SubscriptionPlan;
  public credits: number;
  public isBlocked: boolean;
  public subscriptionExpiresAt?: Date;

  public profileImage?: string;
  private refreshTokens: string[];

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.googleId = props.googleId;

    this.subscriptionPlan = props.subscriptionPlan ?? "FREE";
    this.credits = props.credits ?? 20;
    this.isBlocked = props.isBlocked ?? false;
    this.subscriptionExpiresAt = props.subscriptionExpiresAt;

    this.profileImage = props.profileImage;
    this.refreshTokens = props.refreshTokens ?? [];
  }

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
     return [...this.refreshTokens];
  }

  getId(): string {
  if (!this.id) {
    throw new Error("User ID is not set");
  }
  return this.id;
}
}

type UserProps = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  googleId?: string;

  subscriptionPlan?: SubscriptionPlan;
  credits?: number;
  isBlocked?: boolean;
  subscriptionExpiresAt?: Date;

  profileImage?: string;
  refreshTokens?: string[];
};
