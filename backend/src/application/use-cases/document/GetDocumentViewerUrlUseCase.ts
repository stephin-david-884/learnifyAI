import { AppError } from "../../../domain/errors/AppError";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { docMessages } from "../../constants/messages/docMessages";
import { IStorageService } from "../../interfaces/services/document/IStorageService";
import { IGetDocumentViewerUrlUseCase } from "../../interfaces/usecases/document/IGetDocumentViewerUrlUseCase";

export class GetDocumentViewerUrlUseCase implements IGetDocumentViewerUrlUseCase {

    constructor(
        private readonly _documentRepository: IDocumentRepository,

        private readonly _storageService: IStorageService
    ) { }

    async execute(userId: string, documentId: string): Promise<string> {

        const document = await this._documentRepository.findByUserAndId(userId, documentId);

        if (!document) {
            throw new AppError(
                docMessages.error.DOCUMENT_NOT_FOUND,
                statusCode.NOT_FOUND
            );
        }

        return await this._storageService.generatePresignedUrl(document.s3Key);
    }
}