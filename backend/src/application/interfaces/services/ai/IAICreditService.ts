export interface IAICreditService {

    consumeForAIUsage(userId: string, amount: number): Promise<void>;
}