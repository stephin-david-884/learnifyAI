import { Types } from "mongoose";
import { DocumentChunk } from "../../domain/entities/DocumentChunk.entity";
import { DocumentChunkLean } from "../../infrastructure/database/models/DocumentChunk";

export const toDomainDocumentChunk = (
    db: DocumentChunkLean
): DocumentChunk => {
    return new DocumentChunk({
        id: db._id.toString(),
        documentId: db.documentId.toString(),
        userId: db.userId.toString(),
        content: db.content,
        embedding: db.embedding,
        metadata: db.metadata,
        createdAt: db.createdAt,
        updatedAt: db.updatedAt,
    });
};

export const toPersistenceDocumentChunk = (
    entity: DocumentChunk
) => {
    return {
        documentId: new Types.ObjectId(
            entity.documentId
        ),

        userId: new Types.ObjectId(
            entity.userId
        ),

        content: entity.content,

        embedding: entity.embedding,

        metadata: entity.metadata,
    };
};