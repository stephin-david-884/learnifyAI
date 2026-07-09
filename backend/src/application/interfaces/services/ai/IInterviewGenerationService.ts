import { InterviewQuestion } from "../../../../domain/entities/Interview.entity";

export interface IInterviewGenerationService {

    generateInterview(
        context: string, 
        topics: string[], 
        questionCount: number
    ): Promise<InterviewQuestion[]>;
}