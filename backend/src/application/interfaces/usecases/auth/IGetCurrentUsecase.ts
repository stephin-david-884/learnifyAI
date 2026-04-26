import { GetCurrentUserOutputDTO } from "../../../dtos/auth/getCurrentUser.auth.dto";

export interface IGetCurrentUsecase {
    execute(accessToken: string): Promise<GetCurrentUserOutputDTO>;
}