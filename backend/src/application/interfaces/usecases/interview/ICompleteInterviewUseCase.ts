import { CompleteInterviewDTO } from "../../../dtos/interview/CompleteInterviewDTO";
import { CompleteInterviewResponseDTO } from "../../../dtos/interview/CompleteInterviewResponseDTO";

export interface ICompleteInterviewUseCase {
    execute(data: CompleteInterviewDTO): Promise<CompleteInterviewResponseDTO>; 
}