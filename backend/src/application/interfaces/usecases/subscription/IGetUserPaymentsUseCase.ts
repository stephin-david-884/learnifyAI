import { Payment } from "../../../../domain/entities/Payment.entity";

export interface IGetUserPaymentsUseCase {
    execute(userId: string): Promise<Payment[]>;
}