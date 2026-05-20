import { Payment } from "../../../../domain/entities/Payment.entity";
import { IPaymentRepository } from "../../../../domain/repositories/IPaymentRepository";
import { PaginatedResponseDTO } from "../../../dtos/common/paginated-response.dto";
import { GetAllPaymentsDTO } from "../../../dtos/payment/GetAllPaymentsDTO";
import { IGetAdminPaymentsUsecase } from "../../../interfaces/usecases/subscription/IGetAdminPaymentsUseCase";

export class GetAdminPaymentsUsecase implements IGetAdminPaymentsUsecase {

    constructor(
        private readonly _paymentRepository: IPaymentRepository
    ) {}

    async execute(query: GetAllPaymentsDTO): Promise<PaginatedResponseDTO<Payment>> {
        
        return await this._paymentRepository.getAdminPayments(query);

    }
}