import { Document } from "../../../../domain/entities/Document.entity";
import { UploadDocumentDTO } from "../../../dtos/document/UploadDocumentDTO";

export interface IUploadDocumentUseCase {
    execute(data: UploadDocumentDTO): Promise<Document>;
}