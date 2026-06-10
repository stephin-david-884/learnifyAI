import {
    QuizQuestion,
} from "../../../../domain/entities/Quiz.entity";

export interface IQuizGenerationService {

    generateQuiz(
        context: string,
        topics: string[],
        questionCount: number
    ): Promise<QuizQuestion[]>;
}