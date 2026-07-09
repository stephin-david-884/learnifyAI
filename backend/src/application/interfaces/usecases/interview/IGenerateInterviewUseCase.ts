import { GenerateInterviewDTO } from "../../../dtos/interview/GenerateInterviewDTO";
import { GenerateInterviewResponseDTO } from "../../../dtos/interview/GenerateInterviewResponseDTO";

export interface IGenerateInterviewUseCase {

    execute(
        data: GenerateInterviewDTO
    ): Promise<GenerateInterviewResponseDTO>;
}