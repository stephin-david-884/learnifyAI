import { Request } from "express";
import { GetUserDocumentsDTO } from "../../dtos/document/GetUserDocumentsDTO";

export const mapToGetUserDocumentsDTO = (req: Request): GetUserDocumentsDTO => {

    return {
        page: Number(req.query.page) || 1,

        limit: Number(req.query.limit) || 10,

        search: req.query.search as string,

        status: req.query.status as
            | "UPLOADING"
            | "PROCESSING"
            | "READY"
            | "FAILED"
            | undefined,

        sortBy:
            req.query.sortBy as
            | "createdAt"
            | "title"
            | undefined,

        sortOrder:
            req.query.sortOrder as
            | "asc"
            | "desc"
            | undefined,
    };
};