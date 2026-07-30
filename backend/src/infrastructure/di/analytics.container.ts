import { IGetAIAnalytics } from "../../application/interfaces/usecases/analytics/IGetAIAnalytics";
import { IGetDashboardSummary } from "../../application/interfaces/usecases/analytics/IGetDashboardSummary";
import { IGetDocumentAnalytics } from "../../application/interfaces/usecases/analytics/IGetDocumentAnalytics";
import { IGetRevenueAnalytics } from "../../application/interfaces/usecases/analytics/IGetRevenueAnalytics";
import { IGetUserAnalytics } from "../../application/interfaces/usecases/analytics/IGetUserAnalytics";
import { GetAIAnalytics } from "../../application/use-cases/analytics/GetAIAnalytics";
import { GetDashboardSummary } from "../../application/use-cases/analytics/GetDashboardSummary";
import { GetDocumentAnalytics } from "../../application/use-cases/analytics/GetDocumentAnalytics";
import { GetRevenueAnalytics } from "../../application/use-cases/analytics/GetRevenueAnalytics";
import { GetUserAnalytics } from "../../application/use-cases/analytics/GetUserAnalytics";
import { AnalyticsController } from "../../interfaces/controllers/ai/AnalyticsController";
// import { AIUsageRepository } from "../repositories/AIUsageRepository";
import { AnalyticsRepository } from "../repositories/AnalyticsRepository";
import { DocumentAnalyticsRepository } from "../repositories/DocumentAnalyticsRepository";
import { RevenueAnalyticsRepository } from "../repositories/RevenueAnalyticsRepository";
import { UserAnalyticsRepository } from "../repositories/UserAnalyticsRepository";

// REPOSITORIES
// const aiUsageRepository = new AIUsageRepository();
const analyticsRepository = new AnalyticsRepository();
const userAnalyticsRepository = new UserAnalyticsRepository();
const documentAnalyticsRepository = new DocumentAnalyticsRepository();
const revenueAnalyticsRepository = new RevenueAnalyticsRepository();

//USECASES

const getAIAnalytics: IGetAIAnalytics =
    new GetAIAnalytics(analyticsRepository);

const getUserAnalytics: IGetUserAnalytics =
    new GetUserAnalytics(userAnalyticsRepository);

const getDocumentAnalytics: IGetDocumentAnalytics =
    new GetDocumentAnalytics(documentAnalyticsRepository);

const getRevenueAnalytics: IGetRevenueAnalytics =
    new GetRevenueAnalytics(revenueAnalyticsRepository);

const getDashboardSummary: IGetDashboardSummary =
    new GetDashboardSummary(
        getAIAnalytics,
        getUserAnalytics,
        getDocumentAnalytics,
        getRevenueAnalytics
    )

//CONTROLLERS

export const analyticsController =
    new AnalyticsController(
        getAIAnalytics,

        getUserAnalytics,

        getDocumentAnalytics,

        getRevenueAnalytics,

        getDashboardSummary,
    );