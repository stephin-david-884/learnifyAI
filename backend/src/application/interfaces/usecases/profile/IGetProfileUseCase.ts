import { GetProfileResponseDTO } from "../../../dtos/profile/GetProfileResponseDTO";

export interface IGetProfileUseCase {
    execute(userId: string): Promise<GetProfileResponseDTO>;
}