import express from "express";
import { ROUTES } from "../../shared/constants/routes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { tokenService } from "../../infrastructure/di/container";
import { verifyCsrf } from "../middlewares/csrfVerify";
import { uploadDocumentMiddleware } from "../middlewares/uploadDocument.middleware";
import { validate } from "../middlewares/validate";
import { uploadDocumentSchema } from "../validators/document/document.validator";
import { documentController } from "../../infrastructure/di/document.container";

const router = express.Router();

router.post(ROUTES.DOCUMENT.UPLOAD,
    authMiddleware(tokenService),
    verifyCsrf,
    uploadDocumentMiddleware,
    validate(uploadDocumentSchema, "body"),
    documentController.uploadDocument
);

export default router;