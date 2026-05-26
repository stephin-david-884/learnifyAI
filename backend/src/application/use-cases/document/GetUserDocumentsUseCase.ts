import { Document } from "../../../domain/entities/Document.entity";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { PaginatedResponseDTO } from "../../dtos/common/paginated-response.dto";
import { GetUserDocumentsDTO } from "../../dtos/document/GetUserDocumentsDTO";
import { IGetUserDocumentsUseCase } from "../../interfaces/usecases/document/IGetUserDocumentsUseCase";

export class GetUserDocumentsUseCase implements IGetUserDocumentsUseCase {

    constructor(
        private readonly _documentRepository: IDocumentRepository
    ) {}
    
    async execute(userId: string, query: GetUserDocumentsDTO): Promise<PaginatedResponseDTO<Document>> {
        return this._documentRepository.getUserDocuments(userId, query);
    }
}