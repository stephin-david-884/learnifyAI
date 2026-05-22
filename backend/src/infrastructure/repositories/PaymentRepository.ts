import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { GetAllPaymentsDTO } from "../../application/dtos/payment/GetAllPaymentsDTO";
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
            .sort({ createdAt: -1 })
            .lean();

        return docs.map(this._toDomain);
    }

    async findSuccessfulPaymentByPaymentId(razorpayPaymentId: string): Promise<Payment | null> {
        const doc = await this._model.findOne({
            razorpayPaymentId,
            status: "SUCCESS"
        }).lean();

        return doc ? this._toDomain(doc) : null;
    }

    async getAdminPayments(query: GetAllPaymentsDTO): Promise<PaginatedResponseDTO<Payment>> {

        const { page, limit, search, status, sortBy = "createdAt", sortOrder = "desc" } = query;

        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = {};

        if (status) {
            filter.status = status;
        }

        if (search?.trim()) {

            filter.$or = [
                {
                    razorpayOrderId: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    razorpayPaymentId: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
            ];
        }
        
        const sort: Record<string, 1 | -1> = {
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        };

        const [docs, total] = await Promise.all([
            this._model
                .find(filter)
                .populate("userId", "name email")
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean(),

            this._model.countDocuments(filter)    
        ]);

        return {
            items: docs.map((doc) => this._toDomain(doc as PaymentLean)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit)
        }
    }
}