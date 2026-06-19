import { CancelSubscriptionDTO } from "../../../dtos/profile/CancelSubscriptionDTO";

export interface ICancelSubscriptionUseCase {
    execute(data: CancelSubscriptionDTO): Promise<void>;
}