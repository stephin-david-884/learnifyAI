export type PlanFeatures = {
    maxDocuments: number;
    interviewAccess: boolean;
};

type SubscriptionPlanProps = {
    id?: string;
    name: string;
    price: number;
    creditsPerMonth: number;
    discount?: number;
    features: PlanFeatures;
    isActive?: boolean;
    version: number;
    createdAt?: Date;
    updatedAt?: Date;
    billingCycle: BillingCycle;
    durationInDays: number;
    creditResetIntervalInDays: number;
};

export class SubscriptionPlan {
    public readonly id?: string;

    public name: string;
    public price: number;
    public creditsPerMonth: number;
    public discount: number;
    public features: PlanFeatures;
    public isActive: boolean;
    public version: number;
    public billingCycle: BillingCycle;
    public durationInDays: number;
    public creditResetIntervalInDays: number;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    constructor(props: SubscriptionPlanProps) {
        this.id = props.id;
        this.name = props.name;
        this.price = props.price;
        this.creditsPerMonth = props.creditsPerMonth;
        this.discount = props.discount ?? 0;
        this.features = props.features;
        this.isActive = props.isActive ?? true;
        this.version = props.version;
        this.billingCycle = props.billingCycle;
        this.durationInDays = props.durationInDays;
        this.creditResetIntervalInDays = props.creditResetIntervalInDays;

        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;

        this.validate();
    }

    private validate() {
        if (this.price < 0) {
            throw new Error("Price cannot be negative");
        }

        if (this.creditsPerMonth < 0) {
            throw new Error("Credits cannot be negative");
        }

        if (this.version < 1) {
            throw new Error("Version must be at least 1");
        }

        if (this.durationInDays <= 0) {
            throw new Error("Invalid duration");
        }

        if (this.creditResetIntervalInDays <= 0) {
            throw new Error("Invalid credit reset interval");
        }
    }

    deactivate() {
        this.isActive = false;
    }

    activate() {
        this.isActive = true;
    }

    updatePrice(newPrice: number) {
        if (newPrice < 0) {
            throw new Error("Invalid price");
        }
        this.price = newPrice;
    }

    updateCredits(newCredits: number) {
        if (newCredits < 0) {
            throw new Error("Invalid credits");
        }
        this.creditsPerMonth = newCredits;
    }

    getId() {
        if (!this.id) {
            throw new Error("Plan ID not set")
        }
        return this.id;
    }
}

export type BillingCycle = "MONTHLY" | "YEARLY"