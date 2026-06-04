import { IDeleteDocumentUseCase } from "../../application/interfaces/usecases/document/IDeleteDocumentUseCase";
import { IGetDocumentByIdUseCase } from "../../application/interfaces/usecases/document/IGetDocumentByIdUseCase";
import { IGetDocumentViewerUrlUseCase } from "../../application/interfaces/usecases/document/IGetDocumentViewerUrlUseCase";
import { IGetUserDocumentsUseCase } from "../../application/interfaces/usecases/document/IGetUserDocumentsUseCase";
import { IUploadDocumentUseCase } from "../../application/interfaces/usecases/document/IUploadDocumentUseCase";
import { DeleteDocumentUseCase } from "../../application/use-cases/document/DeleteDocumentUseCase";
import { GetDocumentByIdUseCase } from "../../application/use-cases/document/GetDocumentByIdUseCase";
import { GetDocumentViewerUrlUseCase } from "../../application/use-cases/document/GetDocumentViewerUrlUseCase";
import { GetUserDocumentsUseCase } from "../../application/use-cases/document/GetUserDocumentsUseCase";
import { UploadDocumentUseCase } from "../../application/use-cases/document/UploadDocumentUseCase";
import { DocumentController } from "../../interfaces/controllers/document/DocumentController";
import { DocumentChunkRepository } from "../repositories/DocumentChunkRepository";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { S3StorageService } from "../services/document/S3StorageService";

//REPOSITORIES
const documentRepository = new DocumentRepository();
const documentChunkRepository = new DocumentChunkRepository();

//SERVICES
const storageService = new S3StorageService();

//USECASES
const uploadDocumentUseCase: IUploadDocumentUseCase = new UploadDocumentUseCase(
    documentRepository,
    storageService
);

const getUserDocumentsUseCase: IGetUserDocumentsUseCase = new GetUserDocumentsUseCase(
    documentRepository
);

const getDocumentByIdUseCase: IGetDocumentByIdUseCase = new GetDocumentByIdUseCase(
    documentRepository
);

const deleteDocumentUseCase: IDeleteDocumentUseCase = new DeleteDocumentUseCase(
    documentRepository,
    documentChunkRepository,
    storageService
);

const getDocumentViewerUrlUseCase: IGetDocumentViewerUrlUseCase = new GetDocumentViewerUrlUseCase(
    documentRepository,
    storageService,
)

// CONTROLLER
export const documentController =
    new DocumentController(
        uploadDocumentUseCase,
        getUserDocumentsUseCase,
        getDocumentByIdUseCase,
        deleteDocumentUseCase,
        getDocumentViewerUrlUseCase,
    );
