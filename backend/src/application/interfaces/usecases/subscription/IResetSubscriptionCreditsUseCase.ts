export interface IResetSubscriptionCreditsUseCase {
    execute(): Promise<number>;
}