import { AppError }
    from "../../../domain/errors/AppError";

import {
    QuizAnswer,
} from "../../../domain/entities/Quiz.entity";

import {
    IQuizRepository,
} from "../../../domain/repositories/IQuizRepository";

import {
    statusCode,
} from "../../constants/enums/statusCode";

import {
    SubmitQuizDTO,
} from "../../dtos/quiz/SubmitQuizDTO";

import {
    QuizReviewItemDTO,
    SubmitQuizResponseDTO,
} from "../../dtos/quiz/SubmitQuizResponseDTO";

import {
    ISubmitQuizUseCase,
} from "../../interfaces/usecases/quiz/ISubmitQuizUseCase";
import { quizMessages } from "../../constants/messages/quizMessages";
import { authMessages } from "../../constants/messages/authMessages";

export class SubmitQuizUseCase
    implements ISubmitQuizUseCase {

    constructor(
        private readonly _quizRepository: IQuizRepository,
    ) { }

    async execute(
        data: SubmitQuizDTO
    ): Promise<SubmitQuizResponseDTO> {

        const quiz =
            await this._quizRepository
                .findById(data.quizId);

        if (!quiz) {
            throw new AppError(quizMessages.error.QUIZ_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (quiz.userId !== data.userId) {
            throw new AppError(authMessages.error.UNAUTHORIZED, statusCode.FORBIDDEN);
        }

        if (quiz.status === "COMPLETED") {
            throw new AppError(quizMessages.error.QUIZ_COMPLETED, statusCode.BAD_REQUEST);
        }

        if (data.answers.length !== quiz.questions.length) {
            throw new AppError("Invalid answer submission", statusCode.BAD_REQUEST
            );
        }

        const uniqueIndexes = new Set( data.answers.map((answer) =>answer.questionIndex));

        if (uniqueIndexes.size !== quiz.questions.length) {
            throw new AppError("Missing answers",statusCode.BAD_REQUEST);
        }

        const answers: QuizAnswer[] = [];

        const review: QuizReviewItemDTO[] = [];

        let score = 0;

        quiz.questions.forEach(
            (question, index) => {

                const submittedAnswer =
                    data.answers.find(
                        (answer) =>
                            answer.questionIndex === index
                    );

                const selectedAnswer =
                    submittedAnswer?.selectedAnswer ?? "";

                const isCorrect =
                    selectedAnswer ===
                    question.correctAnswer;

                if (isCorrect) {
                    score++;
                }

                answers.push({
                    questionIndex: index,
                    selectedAnswer,
                    isCorrect,
                });

                review.push({
                    question: question.question,

                    options: question.options,

                    selectedAnswer,

                    correctAnswer:
                        question.correctAnswer,

                    explanation:
                        question.explanation,

                    isCorrect,

                    difficulty:
                        question.difficulty,
                });
            }
        );

        quiz.completeQuiz(
            answers,
            score
        );

        await this._quizRepository
            .save(quiz);

        return {
            quizId:
                quiz.getId(),

            score,

            totalQuestions:
                quiz.totalQuestions,

            correctAnswers:
                score,

            percentage:
                Math.round(
                    (score /
                        quiz.totalQuestions) *
                    100
                ),

            review,
        };
    }
}