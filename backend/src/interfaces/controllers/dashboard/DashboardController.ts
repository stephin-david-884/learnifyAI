import { Request, Response } from "express";
import { IGetDashboardSummaryUseCase } from "../../../application/interfaces/usecases/dashboard/IGetDashboardSummaryUsecase";
import { asyncHandler } from "../../http/asyncHandler";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { sendSuccess } from "../../http/response";


export class DashboardController {

    constructor(
        private readonly _getDashboardSummaryUseCase: IGetDashboardSummaryUseCase,
    ) {}

    getDashboardSummary = asyncHandler(
        async (req: Request, res: Response) => {

            const userId = req.user.userId;

            const dashboard = await this._getDashboardSummaryUseCase.execute(userId);

            return sendSuccess(
                res,
                statusCode.OK,
                "Dashboard summary fetched successfully",
                dashboard
            );
        }
    );
}