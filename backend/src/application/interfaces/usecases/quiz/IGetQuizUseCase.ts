import { GetQuizDTO,} from "../../../dtos/quiz/GetQuizDTO";

import { GetQuizResponseDTO,} from "../../../dtos/quiz/GetQuizResponseDTO";

export interface IGetQuizUseCase {

    execute(data: GetQuizDTO): Promise<GetQuizResponseDTO>;
}