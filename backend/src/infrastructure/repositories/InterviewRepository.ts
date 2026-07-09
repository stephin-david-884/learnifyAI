import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { toDomainInterview, toPersistenceInterview } from "../../application/mappers/InterviewMapper";
import { Interview } from "../../domain/entities/Interview.entity";
import { IInterviewRepository } from "../../domain/repositories/IInterviewRepository";
import { InterviewLean, InterviewModel } from "../database/models/Interview";
import { BaseRepository } from "./BaseRepository";

export class InterviewRepository
    extends BaseRepository<Interview, InterviewLean>
    implements IInterviewRepository {

    constructor() {
        super(InterviewModel, toDomainInterview, toPersistenceInterview);
    }

    async findByUserAndId(userId: string, interviewId: string): Promise<Interview | null> {
        
        const interview = await this._model.findOne({_id: interviewId, userId}).lean();

        return interview ? this._toDomain(interview) : null;
    }

    async findByUserAndDocument(userId: string, documentId: string): Promise<Interview[]> {
        
        const interviews = await this._model.find({userId, documentId})
                                            .sort({createdAt: -1})
                                            .lean();
        
        return interviews.map((interview) => this._toDomain(interview));                                    
    }

    async getUserInterviews(userId: string, page: number, limit: number): Promise<PaginatedResponseDTO<Interview>> {
        
        const skip = (page-1)* limit;

        const [interviews, total] = await Promise.all([
                this._model
                    .find({userId})
                    .sort({createdAt: -1})
                    .skip(skip)
                    .limit(limit)
                    .lean(),

                this._model.countDocuments({userId})    
        ]);

        return {
            items: interviews.map((interview) => this._toDomain(interview)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total/limit)
        }
    }
}