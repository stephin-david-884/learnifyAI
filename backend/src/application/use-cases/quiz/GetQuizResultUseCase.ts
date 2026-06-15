import { AppError } from "../../../domain/errors/AppError";
import { IQuizRepository } from "../../../domain/repositories/IQuizRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { authMessages } from "../../constants/messages/authMessages";
import { quizMessages } from "../../constants/messages/quizMessages";
import { GetQuizDTO } from "../../dtos/quiz/GetQuizDTO";
import { SubmitQuizResponseDTO } from "../../dtos/quiz/SubmitQuizResponseDTO";
import { IGetQuizResultUseCase } from "../../interfaces/usecases/quiz/IGetQuizResultUseCase";

export class GetQuizResultUseCase implements IGetQuizResultUseCase {

    constructor(
        private readonly _quizRepository: IQuizRepository,
    ) {}

    async execute(data: GetQuizDTO): Promise<SubmitQuizResponseDTO> {
        
        const quiz = await this._quizRepository.findById(data.quizId);

        if(!quiz) {
            throw new AppError(quizMessages.error.QUIZ_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if(quiz.userId !== data.userId){
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.UNAUTHORIZED);
        }

        if(quiz.status !== "COMPLETED"){
            throw new AppError(quizMessages.error.QUIZ_NOT_COMPLETED, statusCode.BAD_REQUEST);
        }

        const review = quiz.questions.map((question, index) => {

            const answer = quiz.answers.find((a) => a.questionIndex === index);

            return {
                question: question.question,
                options: question.options,
                selectedAnswer: answer?.selectedAnswer ?? "",
                correctAnswer: question.correctAnswer,
                explanation: question.explanation,
                isCorrect: answer?.isCorrect ?? false,
                difficulty: question.difficulty,
            };
        });

        const correctAnswers = quiz.answers.filter((answer) => answer.isCorrect).length;

        return {
            quizId: quiz.getId(),
            score:quiz.score,
            totalQuestions: quiz.totalQuestions,
            correctAnswers,
            percentage: Math.round((quiz.score / quiz.totalQuestions) * 100),
            review,
        };
    }
}