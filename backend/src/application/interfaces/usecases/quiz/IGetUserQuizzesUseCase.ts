import { GetUserQuizzesDTO,} from "../../../dtos/quiz/GetUserQuizzesDTO";

import { GetUserQuizzesResponseDTO,} from "../../../dtos/quiz/GetUserQuizzesResponseDTO";

export interface IGetUserQuizzesUseCase {

    execute( data: GetUserQuizzesDTO): Promise<GetUserQuizzesResponseDTO>;
}