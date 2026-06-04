import { Request, Response } from "express";
import { IDeleteDocumentUseCase } from "../../../application/interfaces/usecases/document/IDeleteDocumentUseCase";
import { IGetDocumentByIdUseCase } from "../../../application/interfaces/usecases/document/IGetDocumentByIdUseCase";
import { IGetUserDocumentsUseCase } from "../../../application/interfaces/usecases/document/IGetUserDocumentsUseCase";
import { IUploadDocumentUseCase } from "../../../application/interfaces/usecases/document/IUploadDocumentUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { mapToUploadDocumentDTO } from "../../../application/mappers/document/DocumentDTOMapper";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { docMessages } from "../../../application/constants/messages/docMessages";
import { mapToGetUserDocumentsDTO } from "../../../application/mappers/document/mapToGetUserDocumentsDTO";
import { mapToDocumentIdDTO } from "../../../application/mappers/document/mapToDocumentIdDTO";
import { IGetDocumentViewerUrlUseCase } from "../../../application/interfaces/usecases/document/IGetDocumentViewerUrlUseCase";

export class DocumentController {

    constructor(
        private readonly _uploadDocumentUseCase: IUploadDocumentUseCase,

        private readonly _getUserDocumentsUseCase: IGetUserDocumentsUseCase,

        private readonly _getDocumentByIdUseCase: IGetDocumentByIdUseCase,

        private readonly _deleteDocumentUseCase: IDeleteDocumentUseCase,

        private readonly _getDocumentViewerUrlUseCase: IGetDocumentViewerUrlUseCase,
    ) { }

    uploadDocument = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToUploadDocumentDTO(req);

        const document = await this._uploadDocumentUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.CREATED,
            docMessages.success.DOCUMENT_UPLOADED,
            document
        );
    });

    getUserDocuments = asyncHandler(async (req: Request, res: Response) => {

        const query = mapToGetUserDocumentsDTO(req);

        const documents = await this._getUserDocumentsUseCase.execute(req.user.userId, query);

        return sendSuccess(
            res,
            statusCode.OK,
            docMessages.success.DOCUMENTS_FETCHED,
            documents
        );
    });

    getDocumentsById = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToDocumentIdDTO(req);

        const document = await this._getDocumentByIdUseCase.execute(data.userId, data.documentId);

        return sendSuccess(
            res,
            statusCode.OK,
            docMessages.success.DOCUMENT_FETCHED,
            document
        );
    });

    deleteDocument = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToDocumentIdDTO(req);

        await this._deleteDocumentUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            docMessages.success.DOCUMENT_DELETED,
        )
    });

    getDocumentViewerUrl = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToDocumentIdDTO(req);

        const url = await this._getDocumentViewerUrlUseCase.execute(
            data.userId,
            data.documentId
        );

        return sendSuccess(
            res,
            statusCode.OK,
            docMessages.success.DOCUMENTS_URL_FETCHED,
            {url}
        )
    })
}