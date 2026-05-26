import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { verifyCsrf } from "../middlewares/csrfVerify";
import { uploadDocumentMiddleware } from "../middlewares/uploadDocument.middleware";
import { validate } from "../middlewares/validate";
import { documentIdParamSchema, getUserDocumentsQuerySchema, uploadDocumentSchema } from "../validators/document/document.validator";
import { documentController } from "../../infrastructure/di/document.container";

const router = express.Router();

router.post(ROUTES.DOCUMENT.UPLOAD,
    authMiddleware(tokenService),
    verifyCsrf,
    uploadDocumentMiddleware,
    validate(uploadDocumentSchema, "body"),
    documentController.uploadDocument
);

router.get(ROUTES.DOCUMENT.GET_USER_DOCUMENTS,
    authMiddleware(tokenService),
    validate(getUserDocumentsQuerySchema, "query"),
    documentController.getUserDocuments
);

router.get(ROUTES.DOCUMENT.GET_DOCUMENT_BY_ID,
    authMiddleware(tokenService),
    validate(documentIdParamSchema, "params"),
    documentController.getDocumentsById
);

router.delete(ROUTES.DOCUMENT.DELETE_DOCUMENT,
    authMiddleware(tokenService),
    verifyCsrf,
    validate(documentIdParamSchema, "params"),
    documentController.deleteDocument
);

export default router;