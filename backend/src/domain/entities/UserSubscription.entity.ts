import { PlanFeatures } from "./SubscriptionPlan.entity";

export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELLED";

export class UserSubscription {
  public readonly id?: string;

  public userId: string;
  public planId: string;
  public planVersion: number;
  public planSnapshot: PlanSnapshot;

  public startDate: Date;
  public endDate: Date;

  public status: SubscriptionStatus;

  public creditsRemaining: number;
  public creditsTotal: number;

  public lastCreditReset: Date;

  public paymentId?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: UserSubscriptionProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.planId = props.planId;
    this.planVersion = props.planVersion;
    this.planSnapshot = props.planSnapshot;

    this.startDate = props.startDate;
    this.endDate = props.endDate;

    this.status = props.status ?? "ACTIVE";

    this.creditsRemaining = props.creditsRemaining;
    this.creditsTotal = props.creditsTotal;

    this.lastCreditReset = props.lastCreditReset;

    this.paymentId = props.paymentId;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    this.validate();
  }

  private validate() {
    if (this.creditsRemaining < 0) {
      throw new Error("Credits remaining cannot be negative");
    }

    if (this.creditsTotal < 0) {
      throw new Error("Total credits cannot be negative");
    }

    if (this.planVersion < 1) {
      throw new Error("Invalid plan version");
    }
  }

  consumeCredits(amount: number) {
    if (amount <= 0) {
      throw new Error("Invalid credit amount");
    }

    if (this.creditsRemaining < amount) {
      throw new Error("Not enough credits");
    }

    this.creditsRemaining -= amount;
  }

  resetCredits() {
    this.creditsRemaining = this.creditsTotal;
    this.lastCreditReset = new Date();
  }

  markExpired() {
    this.status = "EXPIRED";
  }

  cancel() {
    this.status = "CANCELLED";
  }

  isExpired(): boolean {
    return new Date() > this.endDate;
  }

  checkAndExpire() {
    if (new Date() > this.endDate && this.status === "ACTIVE") {
      this.status = "EXPIRED";
    }
  }

  refreshState() {
    this.checkAndExpire();

    if (this.shouldResetCredits()) {
      this.resetCredits();
    }
  }

  shouldResetCredits(): boolean {
    const now = new Date().getTime();
    const lastReset = this.lastCreditReset.getTime();

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    return now - lastReset > THIRTY_DAYS;
  }

  getId(): string {
    if (!this.id) {
      throw new Error("Subscription ID is not set");
    }
    return this.id;
  }
}

type UserSubscriptionProps = {
  id?: string;
  userId: string;
  planId: string;
  planVersion: number;
  planSnapshot: PlanSnapshot

  startDate: Date;
  endDate: Date;

  status?: SubscriptionStatus;

  creditsRemaining: number;
  creditsTotal: number;

  lastCreditReset: Date;

  paymentId?: string;

  createdAt?: Date;
  updatedAt?: Date;
};

type PlanSnapshot = {
  name: string;
  price: number;
  creditsPerMonth: number;
  features: PlanFeatures;
}