import { Document } from "../../../domain/entities/Document.entity";
import { AppError } from "../../../domain/errors/AppError";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { statusCode } from "../../constants/enums/statusCode";
import { docMessages } from "../../constants/messages/docMessages";
import { IGetDocumentByIdUseCase } from "../../interfaces/usecases/document/IGetDocumentByIdUseCase";

export class GetDocumentByIdUseCase implements IGetDocumentByIdUseCase {

    constructor (
        private readonly _documentRepository: IDocumentRepository
    ) {}

    async execute(userId: string, documentId: string): Promise<Document> {
        
        const document = await this._documentRepository.findByUserAndId(userId, documentId);

        if(!document) {
            throw new AppError(docMessages.error.DOCUMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        return document;
    }
}