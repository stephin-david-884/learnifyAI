import { Request, Response } from "express";
import { IDeleteDocumentUseCase } from "../../../application/interfaces/usecases/document/IDeleteDocumentUseCase";
import { IGetDocumentByIdUseCase } from "../../../application/interfaces/usecases/document/IGetDocumentByIdUseCase";
import { IGetUserDocumentsUseCase } from "../../../application/interfaces/usecases/document/IGetUserDocumentsUseCase";
import { IUploadDocumentUseCase } from "../../../application/interfaces/usecases/document/IUploadDocumentUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { AppError } from "../../../domain/errors/AppError";
import { mapToUploadDocumentDTO } from "../../../application/mappers/document/DocumentDTOMapper";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { docMessages } from "../../../application/constants/messages/docMessages";

export class DocumentController {

    constructor(
        private readonly _uploadDocumentUseCase: IUploadDocumentUseCase,

        private readonly _getUserDocumentsUseCase: IGetUserDocumentsUseCase,

        private readonly _getDocumentByIdUseCase: IGetDocumentByIdUseCase,

        private readonly _deleteDocumentUseCase: IDeleteDocumentUseCase,
    ) { }
    
    uploadDocument = asyncHandler(async( req: Request, res: Response) => {

        const data = mapToUploadDocumentDTO(req);

        const document = await this._uploadDocumentUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.CREATED,
            docMessages.success.DOCUMENT_UPLOADED,
            document
        );
    });
}