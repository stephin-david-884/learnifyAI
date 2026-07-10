import { GetInterviewResultDTO } from "../../../dtos/interview/GetInterviewResultDTO";
import { GetInterviewResultResponseDTO } from "../../../dtos/interview/GetInterviewResultResponseDTO";

export interface IGetInterviewResultUseCase {
    execute(data: GetInterviewResultDTO): Promise<GetInterviewResultResponseDTO>;
}