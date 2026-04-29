import { GetAllUsersInputDTO, GetAllUsersOutputDTO } from "../../../dtos/userManagement/getAllUsers.dto";

export interface IGetAllUsersUsecase {
    execute(input: GetAllUsersInputDTO): Promise<GetAllUsersOutputDTO>;
}