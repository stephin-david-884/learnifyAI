import crypto from "crypto";
import { IUploadDocumentUseCase } from "../../interfaces/usecases/document/IUploadDocumentUseCase";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { IStorageService } from "../../interfaces/services/document/IStorageService";
import { Document } from "../../../domain/entities/Document.entity";
import { UploadDocumentDTO } from "../../dtos/document/UploadDocumentDTO";
import { documentProcessingQueue } from "../../../infrastructure/queues/documentProcessing.queue";

export class UploadDocumentUseCase implements IUploadDocumentUseCase {

    constructor(
        private readonly _documentRepository: IDocumentRepository,

        private readonly _storageService: IStorageService
    ) {}

    async execute(data: UploadDocumentDTO): Promise<Document> {
        
        const fileKey = `documents/${data.userId}/${crypto.randomUUID()}.pdf`;

        const uploadedFile = await this._storageService.uploadFile({
            fileName: fileKey,
            mimeType: data.mimeType,
            buffer: data.fileBuffer,
        });

        const document = new Document({
            userId: data.userId,
            title: data.title,
            originalFileName: data.fileName,
            mimeType: data.mimeType,
            fileSize: data.fileSize,
            s3Key: uploadedFile.key,
            fileUrl: uploadedFile.url,
            status: "PROCESSING",
        });

        const savedDocument = await this._documentRepository.save(document);

        await documentProcessingQueue.add(
            "process-document",
            {
                documentId: savedDocument.getId()
            }
        );

        return savedDocument;
    }
}