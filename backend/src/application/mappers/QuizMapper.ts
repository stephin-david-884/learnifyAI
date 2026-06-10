import { Types } from "mongoose";

import { Quiz } from "../../domain/entities/Quiz.entity";

import { QuizLean } from "../../infrastructure/database/models/Quiz";

export const toDomainQuiz = (
    dbQuiz: QuizLean
): Quiz => {

    return new Quiz({
        id: dbQuiz._id.toString(),

        userId:
            dbQuiz.userId.toString(),

        documentId:
            dbQuiz.documentId.toString(),

        title:
            dbQuiz.title,

        generatedFromTopics:
            dbQuiz.generatedFromTopics,

        totalQuestions:
            dbQuiz.totalQuestions,

        questions:
            dbQuiz.questions.map(
                (question) => ({
                    question: question.question,

                    options: question.options,

                    correctAnswer: question.correctAnswer,

                    explanation: question.explanation,

                    difficulty: question.difficulty,
                })
            ),

        answers:
            dbQuiz.answers.map(
                (answer) => ({
                    questionIndex: answer.questionIndex,

                    selectedAnswer: answer.selectedAnswer,

                    isCorrect: answer.isCorrect,
                })
            ),

        score:
            dbQuiz.score,

        status:
            dbQuiz.status,

        completedAt:
            dbQuiz.completedAt,

        createdAt:
            dbQuiz.createdAt,

        updatedAt:
            dbQuiz.updatedAt,
    });
};

export const toPersistenceQuiz = (
    quiz: Quiz
) => {

    return {
        userId: new Types.ObjectId( quiz.userId ),

        documentId: new Types.ObjectId( quiz.documentId ),

        title: quiz.title,

        generatedFromTopics: quiz.generatedFromTopics,

        totalQuestions: quiz.totalQuestions,

        questions:
            quiz.questions.map(
                (question) => ({
                    question: question.question,

                    options: question.options,

                    correctAnswer: question.correctAnswer,

                    explanation: question.explanation,

                    difficulty: question.difficulty,
                })
            ),

        answers:
            quiz.answers.map(
                (answer) => ({
                    questionIndex: answer.questionIndex,

                    selectedAnswer: answer.selectedAnswer,

                    isCorrect: answer.isCorrect,
                })
            ),

        score: quiz.score,

        status: quiz.status,

        completedAt: quiz.completedAt,
    };
};