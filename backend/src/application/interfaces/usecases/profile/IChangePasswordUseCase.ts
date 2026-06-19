import { ChangePasswordDTO } from "../../../dtos/profile/ChangePasswordDTO";

export interface IChangePasswordUseCase {
    execute(data: ChangePasswordDTO): Promise<void>;
}