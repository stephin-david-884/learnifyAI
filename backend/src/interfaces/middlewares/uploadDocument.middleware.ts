import multer from "multer";
import { AppError } from "../../domain/errors/AppError";
import { statusCode } from "../../application/constants/enums/statusCode";
import { docMessages } from "../../application/constants/messages/docMessages";
import { Request } from "express";

const storage = multer.memoryStorage();

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {

    if (
        file.mimetype !== "application/pdf"
    ) {

        return cb(
            new AppError(docMessages.error.DOCUMENT_NOT_ALLOWED, statusCode.BAD_REQUEST)
        );
    }

    cb(null, true);
};

export const uploadDocumentMiddleware = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter,
}).single("file")