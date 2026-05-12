import { CreditStatusDTO } from "../../../dtos/subscription/credit-status.dto";

export interface IGetCreditStatusUseCase {

    execute(userId: string): Promise<CreditStatusDTO>;
}