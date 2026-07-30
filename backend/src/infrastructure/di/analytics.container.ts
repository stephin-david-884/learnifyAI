import { IGetAIAnalytics } from "../../application/interfaces/usecases/analytics/IGetAIAnalytics";
import { IGetDocumentAnalytics } from "../../application/interfaces/usecases/analytics/IGetDocumentAnalytics";
import { IGetUserAnalytics } from "../../application/interfaces/usecases/analytics/IGetUserAnalytics";
import { GetAIAnalytics } from "../../application/use-cases/analytics/GetAIAnalytics";
import { GetDocumentAnalytics } from "../../application/use-cases/analytics/GetDocumentAnalytics";
import { GetUserAnalytics } from "../../application/use-cases/analytics/GetUserAnalytics";
// import { AIUsageRepository } from "../repositories/AIUsageRepository";
import { AnalyticsRepository } from "../repositories/AnalyticsRepository";
import { DocumentAnalyticsRepository } from "../repositories/DocumentAnalyticsRepository";
import { UserAnalyticsRepository } from "../repositories/UserAnalyticsRepository";

// REPOSITORIES
// const aiUsageRepository = new AIUsageRepository();
const analyticsRepository = new AnalyticsRepository();
const userAnalyticsRepository = new UserAnalyticsRepository();
const documentAnalyticsRepository = new DocumentAnalyticsRepository();

//USECASES

const getAIAnalytics: IGetAIAnalytics = 
    new GetAIAnalytics(analyticsRepository);

const getUserAnalytics: IGetUserAnalytics = 
    new GetUserAnalytics(userAnalyticsRepository);

const getDocumentAnalytics: IGetDocumentAnalytics =
    new GetDocumentAnalytics(documentAnalyticsRepository);