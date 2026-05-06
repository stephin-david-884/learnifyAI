import { Payment } from "../entities/Payment.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IPaymentRepository extends IBaseRepository<Payment> {

    findByOrderId(orderId: string): Promise<Payment | null>;

    findByUserId(userId: string): Promise<Payment[]>;

}