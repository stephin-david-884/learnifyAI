import { GetInterviewDTO } from "../../../dtos/interview/GetInterviewDTO";
import { GetInterviewResponseDTO } from "../../../dtos/interview/GetInterviewResponseDTO";

export interface IGetInterviewUseCase {

    execute(
        data: GetInterviewDTO
    ): Promise<GetInterviewResponseDTO>;
}