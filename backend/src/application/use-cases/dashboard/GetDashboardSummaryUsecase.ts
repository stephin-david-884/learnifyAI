import { DashboardSummary } from "../../../domain/entities/DashboardSummary.entity";
import { IDashboardRepository } from "../../../domain/repositories/IDashboardRepository";
import { IGetDashboardSummaryUseCase } from "../../interfaces/usecases/dashboard/IGetDashboardSummaryUsecase";

export class GetDashboardSummaryUseCase
    implements IGetDashboardSummaryUseCase {

    constructor(

        private readonly dashboardRepository: IDashboardRepository

    ) {}

    async execute(
        userId: string
    ): Promise<DashboardSummary> {

        return await this.dashboardRepository.getDashboardSummary(
            userId
        );

    }

}