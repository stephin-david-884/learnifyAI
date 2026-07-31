import { IGetDashboardSummaryUseCase } from "../../application/interfaces/usecases/dashboard/IGetDashboardSummaryUsecase";
import { GetDashboardSummaryUseCase } from "../../application/use-cases/dashboard/GetDashboardSummaryUsecase";
import { DashboardController } from "../../interfaces/controllers/dashboard/DashboardController";
import { DashboardRepository } from "../repositories/DashboardRepository";

const dashboardRepository = new DashboardRepository();

const getDashboardSummaryUseCase: IGetDashboardSummaryUseCase = 
    new GetDashboardSummaryUseCase(dashboardRepository);

export const dashboardController =
    new DashboardController(
        getDashboardSummaryUseCase
    );    