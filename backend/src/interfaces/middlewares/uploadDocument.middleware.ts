import multer from "multer";
import { AppError } from "../../domain/errors/AppError";
import { statusCode } from "../../application/constants/enums/statusCode";
import { docMessages } from "../../application/constants/messages/docMessages";

const storage = multer.memoryStorage();

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const uploadDocumentMiddleware = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: ( _req, file, callback) => {

        const allowedMimeTypes = ["application/pdf",];

        if(!allowedMimeTypes.includes(file.mimetype)) {
            return callback( new AppError(docMessages.error.DOCUMENT_NOT_ALLOWED, statusCode.BAD_REQUEST))
        }

        callback(null, true);
    }
}).single("document")