import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { Quiz } from "../entities/Quiz.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IQuizRepository extends IBaseRepository<Quiz> {

    findByUserAndId(userId: string, quizId: string): Promise<Quiz | null>;

    findByUserAndDocument(userId: string, documentId: string): Promise<Quiz[]>;

    getUserQuizzes(userId: string, page: number, limit: number): Promise<PaginatedResponseDTO<Quiz>>;
}