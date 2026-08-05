import { AI_PRICING } from "../../../application/constants/ai/AIPricing";
import { EstimateAICostDTO } from "../../../application/dtos/admin/analytics/estimateAICost.dto";
import { IAICostEstimator } from "../../../application/interfaces/services/analytics/IAICostEstimator";

export class AICostEstimator implements IAICostEstimator {

    estimate(data: EstimateAICostDTO): number {
        
        const pricing = AI_PRICING[data.provider]?.[data.aiModel];

        if (!pricing) {

            return 0;
        }

        const inputTokens = data.requestTokens ?? data.totalTokens ?? 0;

        const outputTokens = data.responseTokens ?? 0;

        const inputCost = (inputTokens / 1_000_000) * pricing.inputPerMillionTokens;

        const outputCost = (outputTokens / 1_000_000) * pricing.outputPerMillionTokens;

        return Number((inputCost + outputCost).toFixed(8));
    }
}