export interface ISyncExpiredSubscriptionsUseCase {
    execute(): Promise<number>;
}