import { IInterviewRepository } from "../../../domain/repositories/IInterviewRepository";
import { GetUserInterviewsDTO } from "../../dtos/interview/GetUserInterviewsDTO";
import { GetUserInterviewsResponseDTO } from "../../dtos/interview/GetUserInterviewsResponseDTO";
import { IGetUserInterviewsUseCase } from "../../interfaces/usecases/interview/IGetUserInterviewsUseCase";

export class GetUserInterviewsUseCase implements IGetUserInterviewsUseCase {

    constructor(
        private readonly _interviewRepository: IInterviewRepository,
    ) {}

    async execute(data: GetUserInterviewsDTO): Promise<GetUserInterviewsResponseDTO> {
        
        const page = data.page ?? 1;

        const limit = data.limit ?? 10;

        const result =
            await this._interviewRepository.getUserInterviews(data.userId,page,limit);

        return {

            items:
                result.items.map(
                    interview => ({

                        id:
                            interview.getId(),

                        title:
                            interview.title,

                        generatedFromTopics:
                            interview.generatedFromTopics,

                        totalQuestions:
                            interview.totalQuestions,

                        overallScore:
                            interview.overallScore,

                        status:
                            interview.status,

                        createdAt:
                            interview.createdAt,
                    })
                ),

            total:
                result.total,

            page:
                result.page,

            limit:
                result.limit,

            totalPages:
                result.totalPages,
        };
    }
}