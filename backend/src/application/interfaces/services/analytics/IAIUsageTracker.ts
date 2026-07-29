import { RecordAIUsageDTO } from "../../../dtos/admin/analytics/recordAIUsage.dto";

export interface IAIUsageTracker {

    recordUsage(data: RecordAIUsageDTO): Promise<void>;
}