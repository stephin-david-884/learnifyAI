import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { Interview } from "../entities/Interview.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IInterviewRepository extends IBaseRepository<Interview> {
    
    findByUserAndId(userId: string, interviewId: string): Promise<Interview | null>;

    findByUserAndDocument(userId: string, documentId: string): Promise<Interview[]>;

    getUserInterviews(userId: string, page: number, limit: number): Promise<PaginatedResponseDTO<Interview>>;   
}