import { AppError } from "../../../domain/errors/AppError";
import { IDocumentChunkRepository } from "../../../domain/repositories/IDocumentChunkRepository";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { docMessages } from "../../constants/messages/docMessages";
import { DeleteDocumentDTO } from "../../dtos/document/DeleteDocumentDTO";
import { IStorageService } from "../../interfaces/services/document/IStorageService";
import { IDeleteDocumentUseCase } from "../../interfaces/usecases/document/IDeleteDocumentUseCase";

export class DeleteDocumentUseCase implements IDeleteDocumentUseCase {

    constructor(
        private readonly _documentRepository: IDocumentRepository,
        private readonly _documentChunkRepository: IDocumentChunkRepository,
        private readonly _storageService: IStorageService
    ) { }

    async execute(data: DeleteDocumentDTO): Promise<void> {

        const document = await this._documentRepository.findByUserAndId(data.userId, data.documentId);

        if (!document) {
            throw new AppError(docMessages.error.DOCUMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        await this._documentChunkRepository.deleteByDocumentId(document.getId());

        await this._storageService.deleteFile(document.s3Key);

        await this._documentRepository.deleteById(document.getId());
    }
}