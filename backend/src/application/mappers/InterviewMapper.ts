import { Types } from "mongoose";
import { Interview } from "../../domain/entities/Interview.entity";
import { InterviewLean } from "../../infrastructure/database/models/Interview";

export const toDomainInterview = (
    dbInterview: InterviewLean
): Interview => {

    return new Interview({
        id: dbInterview._id.toString(),
        userId: dbInterview.userId.toString(),
        documentId: dbInterview.documentId.toString(),
        title: dbInterview.title,
        generatedFromTopics: dbInterview.generatedFromTopics,
        totalQuestions: dbInterview.totalQuestions,

        questions:
            dbInterview.questions.map(
                (question) => ({
                    question: question.question,

                    expectedConcepts: question.expectedConcepts,

                    difficulty: question.difficulty,
                })
            ),

        answers:
            dbInterview.answers.map(
                (answer) => ({
                    questionIndex: answer.questionIndex,

                    question: answer.question,

                    difficulty: answer.difficulty,

                    transcript: answer.transcript,

                    score: answer.score,

                    feedback: answer.feedback,

                    strengths: answer.strengths,

                    improvements: answer.improvements,

                })
            ),

        overallScore: dbInterview.overallScore,

        status: dbInterview.status,

        startedAt: dbInterview.startedAt,

        completedAt: dbInterview.completedAt,

        createdAt: dbInterview.createdAt,

        updatedAt: dbInterview.updatedAt,
    });
};

export const toPersistenceInterview = (
    interview: Interview
) => {

    return {

        userId: new Types.ObjectId( interview.userId ),

        documentId: new Types.ObjectId( interview.documentId),

        title: interview.title,

        generatedFromTopics: interview.generatedFromTopics,

        totalQuestions: interview.totalQuestions,

        questions:
            interview.questions.map(
                (question) => ({
                    question:
                        question.question,

                    expectedConcepts:
                        question.expectedConcepts,

                    difficulty:
                        question.difficulty,
                })
            ),

        answers:
            interview.answers.map(
                (answer) => ({
                    questionIndex:
                        answer.questionIndex,

                    question: 
                        answer.question,
                    
                    difficulty:
                        answer.difficulty,    

                    transcript:
                        answer.transcript,

                    score:
                        answer.score,

                    feedback:
                        answer.feedback,

                    strengths:
                        answer.strengths,

                    improvements:
                        answer.improvements,
                })
            ),

        overallScore: interview.overallScore,

        status: interview.status,

        startedAt: interview.startedAt,

        completedAt: interview.completedAt,
    };
};