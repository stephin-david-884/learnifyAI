import { toDomainPayment, toPersistencePayment } from "../../application/mappers/PaymentMapper";
import { Payment } from "../../domain/entities/Payment.entity";
import { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";
import { PaymentLean, PaymentModel } from "../database/models/Payment";
import { BaseRepository } from "./BaseRepository";

export class PaymentRepository
    extends BaseRepository<Payment, PaymentLean>
    implements IPaymentRepository {
    constructor() {
        super(
            PaymentModel,
            toDomainPayment,
            toPersistencePayment
        )
    }

    async findByOrderId(orderId: string): Promise<Payment | null> {
        const doc = await this._model
            .findOne({ razorpayOrderId: orderId })
            .lean();

        return doc ? this._toDomain(doc) : null
    }

    async findByUserId(userId: string): Promise<Payment[]> {
        const docs = await this._model
            .find({ userId })
            .lean();

        return docs.map(this._toDomain);
    }
}