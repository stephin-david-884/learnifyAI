import { UpdateProfileDTO, UpdateProfileResponseDTO } from "../../../dtos/profile/update-profile.dto";

export interface IUpdateProfileUseCase {

    execute(data: UpdateProfileDTO): Promise<UpdateProfileResponseDTO>;
}