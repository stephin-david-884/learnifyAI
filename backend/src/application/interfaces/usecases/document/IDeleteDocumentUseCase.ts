import { DeleteDocumentDTO } from "../../../dtos/document/DeleteDocumentDTO";

export interface IDeleteDocumentUseCase {
    execute(data: DeleteDocumentDTO): Promise<void>;
}