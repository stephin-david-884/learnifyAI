import { IGetAIAnalytics } from "../../application/interfaces/usecases/analytics/IGetAIAnalytics";
import { IGetUserAnalytics } from "../../application/interfaces/usecases/analytics/IGetUserAnalytics";
import { GetAIAnalytics } from "../../application/use-cases/analytics/GetAIAnalytics";
import { GetUserAnalytics } from "../../application/use-cases/analytics/GetUserAnalytics";
// import { AIUsageRepository } from "../repositories/AIUsageRepository";
import { AnalyticsRepository } from "../repositories/AnalyticsRepository";
import { UserAnalyticsRepository } from "../repositories/UserAnalyticsRepository";

// REPOSITORIES
// const aiUsageRepository = new AIUsageRepository();
const analyticsRepository = new AnalyticsRepository();
const userAnalyticsRepository = new UserAnalyticsRepository();

//USECASES

const getAIAnalytics: IGetAIAnalytics = 
    new GetAIAnalytics(analyticsRepository);

const getUserAnalytics: IGetUserAnalytics = 
    new GetUserAnalytics(userAnalyticsRepository)