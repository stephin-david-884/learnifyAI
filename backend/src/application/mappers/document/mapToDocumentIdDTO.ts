import { Request } from "express";

export const mapToDocumentIdDTO = (req: Request) => {

    const documentId = Array.isArray(req.params.documentId)
        ? req.params.documentId[0]
        : req.params.documentId;

    return {
        userId:
            req.user.userId,

        documentId,
    };
};