import { GetQuizDTO } from "../../../dtos/quiz/GetQuizDTO";
import { SubmitQuizResponseDTO } from "../../../dtos/quiz/SubmitQuizResponseDTO";

export interface IGetQuizResultUseCase {

    execute(data: GetQuizDTO): Promise<SubmitQuizResponseDTO>;
}