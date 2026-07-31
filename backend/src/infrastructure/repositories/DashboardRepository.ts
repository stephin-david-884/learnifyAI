import { DashboardSummary } from "../../domain/entities/DashboardSummary.entity";
import { IDashboardRepository } from "../../domain/repositories/IDashboardRepository";
import { DocumentModel } from "../database/models/Document";
import { QuizModel } from "../database/models/Quiz";
import { InterviewModel } from "../database/models/Interview";
import { FlashcardSetModel } from "../database/models/FlashcardSet";

export class DashboardRepository
    implements IDashboardRepository {

    async getDashboardSummary(
        userId: string
    ): Promise<DashboardSummary> {

        const [
            totalDocuments,
            readyDocuments,
            recentDocument,
            quizzesGenerated,
            completedQuizzes,
            quizAverage,
            flashcardSets,
            flashcardAggregate,
            interviewsGenerated,
            completedInterviews,
            interviewAverage,
        ] = await Promise.all([

            DocumentModel.countDocuments({
                userId,
            }),

            DocumentModel.countDocuments({
                userId,
                status: "READY",
            }),

            DocumentModel.findOne({
                userId,
            })
                .sort({
                    updatedAt: -1,
                })
                .select(" _id title status")
                .lean(),

            QuizModel.countDocuments({
                userId,
            }),

            QuizModel.countDocuments({
                userId,
                status: "COMPLETED",
            }),

            QuizModel.aggregate([
                {
                    $match: {
                        userId: DocumentModel.db.base.Types.ObjectId.createFromHexString(userId),
                        status: "COMPLETED",
                    },
                },
                {
                    $group: {
                        _id: null,
                        average: {
                            $avg: "$score",
                        },
                    },
                },
            ]),

            FlashcardSetModel.countDocuments({
                userId,
            }),

            FlashcardSetModel.aggregate([
                {
                    $match: {
                        userId: DocumentModel.db.base.Types.ObjectId.createFromHexString(userId),
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalCards: {
                            $sum: "$cardCount",
                        },
                    },
                },
            ]),

            InterviewModel.countDocuments({
                userId,
            }),

            InterviewModel.countDocuments({
                userId,
                status: "COMPLETED",
            }),

            InterviewModel.aggregate([
                {
                    $match: {
                        userId: DocumentModel.db.base.Types.ObjectId.createFromHexString(userId),
                        status: "COMPLETED",
                    },
                },
                {
                    $group: {
                        _id: null,
                        average: {
                            $avg: "$overallScore",
                        },
                    },
                },
            ]),
        ]);

        return new DashboardSummary({

            totalDocuments,

            readyDocuments,

            totalQuizzes: quizzesGenerated,

            completedQuizzes,

            averageQuizScore:
                quizAverage.length > 0
                    ? Math.round(quizAverage[0].average)
                    : 0,

            totalFlashcardSets: flashcardSets,

            totalFlashcards:
                flashcardAggregate.length > 0
                    ? flashcardAggregate[0].totalCards
                    : 0,

            totalInterviews: interviewsGenerated,

            completedInterviews,

            averageInterviewScore:
                interviewAverage.length > 0
                    ? Math.round(interviewAverage[0].average)
                    : 0,

            continueLearning: recentDocument
                ? {
                    documentId: recentDocument._id.toString(),
                    title: recentDocument.title,
                    status: recentDocument.status,
                }
                : undefined,

            recentActivities: [],
        });
    }
}