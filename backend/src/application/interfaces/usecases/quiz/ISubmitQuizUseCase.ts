import { SubmitQuizDTO } from "../../../dtos/quiz/SubmitQuizDTO";

import { SubmitQuizResponseDTO } from "../../../dtos/quiz/SubmitQuizResponseDTO";

export interface ISubmitQuizUseCase {

    execute(
        data: SubmitQuizDTO): Promise<SubmitQuizResponseDTO>;
}