import { SubmitInterviewDTO } from "../../../dtos/interview/SubmitInterviewDTO";
import { SubmitInterviewResponseDTO } from "../../../dtos/interview/SubmitInterviewResponseDTO";

export interface ISubmitInterviewUseCase {
    execute(data: SubmitInterviewDTO): Promise<SubmitInterviewResponseDTO>;
}