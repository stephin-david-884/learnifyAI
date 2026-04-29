import { Request, Response } from "express";
import { IGetAllUsersUsecase } from "../../../application/interfaces/usecases/userManagement/IGetAllUsersUsecase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { authMessages } from "../../../application/constants/messages/authMessages";
import { IBlockUserUseCase } from "../../../application/interfaces/usecases/admin/user/IBlockUserUseCase";
import { safeStringParam } from "../../../utils/safeParams";

export class UserManagementController {
    constructor(
        private _getAllUsers: IGetAllUsersUsecase,
        private _blockUserUseCase: IBlockUserUseCase
    ) { }

    getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || undefined;

        const result = await this._getAllUsers.execute({ page, limit, search })

        return sendSuccess(
            res,
            statusCode.OK,
            authMessages.success.USERS_FETCHED,
            result
        )
    });

    blockUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = safeStringParam(req.params.userId);
    const { action } = req.body;

    const result = await this._blockUserUseCase.execute({
      userId,
      action,
    });

    return sendSuccess(
      res,
      statusCode.OK,
      `User ${action.toLowerCase()}ed successfully`,
      result
    );
  });

}