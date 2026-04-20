import { GetCurrentUserOutputDTO } from "../../../dtos/getCurrentUser.auth.dto";

export interface IGetCurrentUsecase {
    execute(accessToken: string): Promise<GetCurrentUserOutputDTO>;
}