import { InterviewAnswer } from "../../../../domain/entities/Interview.entity";

export interface IInterviewEvaluationService {

    evaluateInterview(
        answers : InterviewAnswer[],
    ): Promise<InterviewAnswer[]>;
}