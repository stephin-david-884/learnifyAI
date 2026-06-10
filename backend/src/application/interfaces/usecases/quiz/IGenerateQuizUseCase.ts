import { GenerateQuizDTO } from "../../../dtos/quiz/GenerateQuizDTO";

import { GenerateQuizResponseDTO } from "../../../dtos/quiz/GenerateQuizResponseDTO";

export interface IGenerateQuizUseCase {

    execute(data: GenerateQuizDTO): Promise<GenerateQuizResponseDTO>;
}