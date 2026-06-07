import { Types } from "mongoose";
import { Document } from "../../domain/entities/Document.entity";
import { DocumentLean } from "../../infrastructure/database/models/Document";

export const toDomainDocument = (db: DocumentLean): Document => {
    return new Document({
        id: db._id.toString(),
        userId: db.userId.toString(),
        title: db.title,
        originalFileName: db.originalFileName,
        mimeType: db.mimeType,
        fileSize: db.fileSize,
        s3Key: db.s3Key,
        fileUrl: db.fileUrl,
        totalPages: db.totalPages ?? undefined,
        status: db.status,
        processingProgress: db.processingProgress,
        processingStage: db.processingStage ?? undefined,
        topics: db.topics ?? [],
        processingError: db.processingError ?? undefined,

        createdAt: db.createdAt,
        updatedAt: db.updatedAt,
    });
};

export const toPersistenceDocument = (
    entity: Document
) => {
    return {
        userId: new Types.ObjectId(
            entity.userId
        ),
        title: entity.title,
        originalFileName: entity.originalFileName,
        mimeType: entity.mimeType,
        fileSize: entity.fileSize,
        s3Key: entity.s3Key,
        fileUrl: entity.fileUrl,
        totalPages: entity.totalPages ?? null,
        status: entity.status,
        processingProgress: entity.processingProgress,
        processingStage: entity.processingStage ?? null,
        topics: entity.topics,
        processingError: entity.processingError ?? null,
    };
};