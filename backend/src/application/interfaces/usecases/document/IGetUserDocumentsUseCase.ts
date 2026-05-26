import { Document } from "../../../../domain/entities/Document.entity";
import { PaginatedResponseDTO } from "../../../dtos/common/paginated-response.dto";
import { GetUserDocumentsDTO } from "../../../dtos/document/GetUserDocumentsDTO";

export interface IGetUserDocumentsUseCase {
    execute(userId: string, query: GetUserDocumentsDTO): Promise<PaginatedResponseDTO<Document>>;
}