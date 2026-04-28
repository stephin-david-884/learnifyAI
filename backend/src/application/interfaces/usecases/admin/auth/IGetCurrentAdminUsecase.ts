import { GetCurrentAdminOutputDTO } from "../../../../dtos/admin/auth/getCurrentAdmin.dto";

export interface IGetCurrentAdminUsecase {
  execute(accessToken: string): Promise<GetCurrentAdminOutputDTO>;
}