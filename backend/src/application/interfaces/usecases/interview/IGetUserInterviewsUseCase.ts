import { GetUserInterviewsDTO } from "../../../dtos/interview/GetUserInterviewsDTO";
import { GetUserInterviewsResponseDTO } from "../../../dtos/interview/GetUserInterviewsResponseDTO";

export interface IGetUserInterviewsUseCase {
    execute(data: GetUserInterviewsDTO): Promise<GetUserInterviewsResponseDTO>;
}