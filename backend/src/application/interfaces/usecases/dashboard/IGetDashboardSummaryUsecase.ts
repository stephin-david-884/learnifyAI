import { DashboardSummary } from "../../../../domain/entities/DashboardSummary.entity";

export interface IGetDashboardSummaryUseCase {

    execute(
        userId: string
    ): Promise<DashboardSummary>;

}