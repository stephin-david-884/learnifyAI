import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { GetAllPaymentsDTO } from "../../application/dtos/payment/GetAllPaymentsDTO";
import { Payment } from "../entities/Payment.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IPaymentRepository extends IBaseRepository<Payment> {

    findByOrderId(orderId: string): Promise<Payment | null>;

    findByUserId(userId: string): Promise<Payment[]>;

    findSuccessfulPaymentByPaymentId(razorpayPaymentId: string): Promise<Payment | null>;

    getAdminPayments(query: GetAllPaymentsDTO): Promise<PaginatedResponseDTO<Payment>>;
}