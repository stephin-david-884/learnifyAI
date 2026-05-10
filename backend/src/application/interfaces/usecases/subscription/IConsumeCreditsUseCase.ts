import { UserSubscription } from "../../../../domain/entities/UserSubscription.entity";
import { ConsumeCreditsDTO } from "../../../dtos/subscription/credits.subscription.dto";

export interface IConsumeCreditsUseCase {
    execute(data: ConsumeCreditsDTO): Promise<UserSubscription>;
}