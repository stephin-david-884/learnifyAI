import { UserSubscription } from "../../../domain/entities/UserSubscription.entity";
import { ConsumeCreditsDTO } from "../../dtos/subscription/credits.subscription.dto";
import { ICreditService } from "../../interfaces/services/subscription/ICreditService";
import { IConsumeCreditsUseCase } from "../../interfaces/usecases/subscription/IConsumeCreditsUseCase";

export class ConsumeCreditsUseCase implements IConsumeCreditsUseCase {

    constructor(
        private readonly _creditService: ICreditService
    ) {}

    async execute(data: ConsumeCreditsDTO): Promise<UserSubscription> {
        return await this._creditService.consumeCredits(data);
    }
}