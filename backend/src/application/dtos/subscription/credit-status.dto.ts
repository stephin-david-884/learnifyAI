export interface CreditStatusDTO {

    subscriptionId: string;

    status: string;

    planName: string;

    creditsRemaining: number;

    creditsTotal: number;

    lastCreditReset: Date;

    endDate: Date;
}