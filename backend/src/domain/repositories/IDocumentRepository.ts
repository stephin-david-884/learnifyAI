import { PaginatedResponseDTO } from "../../application/dtos/common/paginated-response.dto";
import { GetUserDocumentsDTO } from "../../application/dtos/document/GetUserDocumentsDTO";
import { Document } from "../entities/Document.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IDocumentRepository extends IBaseRepository<Document> {

    getUserDocuments(userId: string, query: GetUserDocumentsDTO): Promise<PaginatedResponseDTO<Document>>;

    findByUserAndId(userId: string, documentId: string): Promise<Document | null>;
}