import { GenerateAnswerDTO, GenerateAnswerResponseDTO } from "../../../dtos/chat/GenerateAnswerDTO";

export interface IGenerateAnswerUseCase {

    execute(data: GenerateAnswerDTO): Promise<GenerateAnswerResponseDTO>
}