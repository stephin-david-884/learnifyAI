export interface IAICreditService {

    validateCredits(userId: string, amount: number): Promise<void>;

    consumeCredits(userId: string, amount: number): Promise<void>;
}