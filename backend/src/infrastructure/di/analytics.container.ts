import { IGetAIAnalytics } from "../../application/interfaces/usecases/analytics/IGetAIAnalytics";
import { GetAIAnalytics } from "../../application/use-cases/analytics/GetAIAnalytics";
// import { AIUsageRepository } from "../repositories/AIUsageRepository";
import { AnalyticsRepository } from "../repositories/AnalyticsRepository";

// REPOSITORIES
// const aiUsageRepository = new AIUsageRepository();
const analyticsRepository = new AnalyticsRepository();

//USECASES

const getAIAnalytics: IGetAIAnalytics = 
    new GetAIAnalytics(analyticsRepository);