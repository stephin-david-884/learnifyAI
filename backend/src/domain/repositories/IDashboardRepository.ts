import { DashboardSummary } from "../entities/DashboardSummary.entity";

export interface IDashboardRepository {

    getDashboardSummary(userId: string): Promise<DashboardSummary>;

}