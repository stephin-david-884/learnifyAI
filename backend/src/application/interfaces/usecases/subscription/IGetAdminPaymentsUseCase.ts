import { Payment } from "../../../../domain/entities/Payment.entity";
import { PaginatedResponseDTO } from "../../../dtos/common/paginated-response.dto";
import { GetAllPaymentsDTO } from "../../../dtos/payment/GetAllPaymentsDTO";

export interface IGetAdminPaymentsUsecase {

    execute( query: GetAllPaymentsDTO ): Promise<PaginatedResponseDTO<Payment>>;
    
}