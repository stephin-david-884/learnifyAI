import { PipelineStage, Types } from "mongoose";
import { toDomainDocumentChunk, toPersistenceDocumentChunk } from "../../application/mappers/DocumentChunkMapper";
import { DocumentChunk } from "../../domain/entities/DocumentChunk.entity";
import { IDocumentChunkRepository } from "../../domain/repositories/IDocumentChunkRepository";
import { DocumentChunkLean, DocumentChunkModel } from "../database/models/DocumentChunk";
import { BaseRepository } from "./BaseRepository";

export class DocumentChunkRepository
    extends BaseRepository<DocumentChunk, DocumentChunkLean>
    implements IDocumentChunkRepository {

    constructor() {
        super(
            DocumentChunkModel,
            toDomainDocumentChunk,
            toPersistenceDocumentChunk
        );
    }

    async createMany(chunks: DocumentChunk[]): Promise<DocumentChunk[]> {

        const docs = await this._model.insertMany(
            chunks.map((chunk) => this._toPersistence(chunk))
        );

        return docs.map((doc) => {
            const plain = doc.toObject ? doc.toObject() : doc;

            return this._toDomain(plain as DocumentChunkLean)
        });
    }

    async findByDocumentId(documentId: string): Promise<DocumentChunk[]> {

        const docs = await this._model
            .find({ documentId })
            .sort({ "metadata.chunkIndex": 1, })
            .lean();

        return docs.map((doc) => this._toDomain(doc))
    }

    async deleteByDocumentId(documentId: string): Promise<void> {
        await this._model.deleteMany({ documentId });
    }

    async findSimilarChunks(embedding: number[], limit: number, documentId?: string): Promise<DocumentChunk[]> {

        const vectorStage = {
            $vectorSearch: {
                index: "document_chunk_vector_index",
                path: "embedding",
                queryVector: embedding,
                numCandidates: 100,
                limit,
                ...(documentId && {
                    filter: {
                        documentId: new Types.ObjectId(documentId),
                    },
                }),
            },
        }

        const pipeline: PipelineStage[] = [
            vectorStage,
        ];

        const docs = await this._model.aggregate(pipeline);

        return docs.map(
            (doc) => this._toDomain(doc as DocumentChunkLean)
        );
    }
}