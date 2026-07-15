import { StartInterviewDTO } from "../../../dtos/interview/StartInterviewDTO";

import { StartInterviewResponseDTO } from "../../../dtos/interview/StartInterviewResponseDTO";

export interface IStartInterviewUseCase {

    execute(data: StartInterviewDTO): Promise<StartInterviewResponseDTO>;
}