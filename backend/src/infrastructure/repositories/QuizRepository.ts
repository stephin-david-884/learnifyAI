import { toDomainQuiz, toPersistenceQuiz } from "../../application/mappers/QuizMapper";
import { Quiz } from "../../domain/entities/Quiz.entity";
import { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import { QuizLean, QuizModel } from "../database/models/Quiz";
import { BaseRepository } from "./BaseRepository";
import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { AppError } from "../../domain/errors/AppError";
import { statusCode } from "../../application/constants/enums/statusCode";

export class QuizRepository
    extends BaseRepository<Quiz, QuizLean>
    implements IQuizRepository {

    constructor() {
        super(
            QuizModel,
            toDomainQuiz,
            toPersistenceQuiz
        );
    }

    async findByUserAndId(userId: string, quizId: string): Promise<Quiz | null> {

        const quiz = await this._model.findOne({ _id: quizId, userId }).lean();

        return quiz ? this._toDomain(quiz) : null;
    }

    async findByUserAndDocument(userId: string, documentId: string): Promise<Quiz[]> {

        const quizzes =
            await this._model.find({ userId, documentId, })
                .sort({
                    createdAt: -1,
                })
                .lean();

        return quizzes.map((quiz) =>this._toDomain(quiz));        
    }

    async getUserQuizzes(userId: string, page: number, limit: number): Promise<PaginatedResponseDTO<Quiz>> {
        
        const skip = (page - 1) * limit;

        const [quizzes, total] =
            await Promise.all([
                this._model
                    .find({ userId })
                    .sort({
                        createdAt: -1,
                    })
                    .skip(skip)
                    .limit(limit)
                    .lean(),

                this._model.countDocuments({
                    userId,
                }),
            ]);

        return {
            items: quizzes.map((quiz) => this._toDomain(quiz)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }   
    }
}