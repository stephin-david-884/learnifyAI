import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { GetUserDocumentsDTO } from "../../application/dtos/document/GetUserDocumentsDTO";
import { toDomainDocument, toPersistenceDocument } from "../../application/mappers/DocumentMapper";
import { Document } from "../../domain/entities/Document.entity";
import { IDocumentRepository } from "../../domain/repositories/IDocumentRepository";
import { DocumentLean, DocumentModel } from "../database/models/Document";
import { BaseRepository } from "./BaseRepository";

export class DocumentRepository
    extends BaseRepository<Document, DocumentLean>
    implements IDocumentRepository {

    constructor() {
        super(
            DocumentModel,
            toDomainDocument,
            toPersistenceDocument
        );
    }

    async getUserDocuments(userId: string, query: GetUserDocumentsDTO): Promise<PaginatedResponseDTO<Document>> {

        const { page, limit, search, status, sortBy = "createdAt", sortOrder = "desc" } = query;

        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = { userId, };

        if (search?.trim()) {
            filter.title = {
                $regex: search.trim(),
                $options: "i",
            };
        }

        if (status) {
            filter.status = status;
        }

        const sort: Record<string, 1 | -1> = {
            [sortBy]:
                sortOrder === "asc" ? 1 : -1,
        };

        const [docs, total] = await Promise.all([
            this._model
                .find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean(),

            this._model.countDocuments(filter)
        ]);

        return {
            items: docs.map((doc) => this._toDomain(doc)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    }

    async findByUserAndId(userId: string, documentId: string): Promise<Document | null> {
        
        const doc = await this._model.findOne({
            _id: documentId,
            userId
        }).lean();

        return doc ? this._toDomain(doc) : null;
    }
}