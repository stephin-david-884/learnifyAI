import { Request } from "express";
import { UploadDocumentDTO } from "../../dtos/document/UploadDocumentDTO";
import { statusCode } from "../../constants/enums/statusCode";
import { AppError } from "../../../domain/errors/AppError";
import { docMessages } from "../../constants/messages/docMessages";

export const mapToUploadDocumentDTO = (req: Request): UploadDocumentDTO => {
    
    if (!req.file) {
        throw new AppError(docMessages.error.DOCUMENT_REQUIRED, statusCode.BAD_REQUEST);
    }

    return {
        userId: req.user.userId,

        title: req.body.title,

        fileName: req.file.originalname,

        mimeType: req.file.mimetype,

        fileBuffer: req.file.buffer,

        fileSize: req.file.size,
    };
}