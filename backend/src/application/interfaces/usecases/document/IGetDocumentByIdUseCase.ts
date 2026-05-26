import { Document } from "../../../../domain/entities/Document.entity";

export interface IGetDocumentByIdUseCase {

    execute(userId: string, documentId: string): Promise<Document>;
    
}