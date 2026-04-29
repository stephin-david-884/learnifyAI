import { BlockUserInputDTO, BlockUserOutputDTO } from "../../../../dtos/userManagement/blockUser.dto";

export interface IBlockUserUseCase {
  execute(data: BlockUserInputDTO): Promise<BlockUserOutputDTO>;
}