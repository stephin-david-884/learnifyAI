import { AnalyticsFilterDTO } from "../../dtos/admin/analytics/analyticsFilter.dto";
import { GetUserAnalyticsResponseDTO } from "../../dtos/admin/analytics/GetUserAnalytics.dto";
import { IGetUserAnalytics } from "../../interfaces/usecases/analytics/IGetUserAnalytics";

export class GetUserAnalytics implements IGetUserAnalytics {

    constructor(
        private readonly userAnalyticsRepository: IUserAnalyticsRepository,
    ) {}

    async execute(
        filter: AnalyticsFilterDTO
    ): Promise<GetUserAnalyticsResponseDTO> {

        const [

            overview,

            registrations,

        ] = await Promise.all([

            this.userAnalyticsRepository.getOverview(filter),

            this.userAnalyticsRepository.getRegistrationTrend(filter),

        ]);

        return {

            overview,

            registrations,

        };

    }

}