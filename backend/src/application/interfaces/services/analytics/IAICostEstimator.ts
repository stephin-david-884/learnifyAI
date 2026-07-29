import { EstimateAICostDTO } from "../../../dtos/admin/analytics/estimateAICost.dto";


export interface IAICostEstimator {

    estimate(data: EstimateAICostDTO): number;
}